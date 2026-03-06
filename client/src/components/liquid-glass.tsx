import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const LiquidSimulation = ({ imagePath = "", text }: { imagePath?: string, text?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const width = window.innerWidth * window.devicePixelRatio;
    const height = window.innerHeight * window.devicePixelRatio;

    const renderTargetA = new THREE.WebGLRenderTarget(width, height, {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });
    const renderTargetB = new THREE.WebGLRenderTarget(width, height, {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });

    const simulationMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouseRef.current },
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D textureA;
        uniform vec2 mouse;
        uniform vec2 resolution;
        uniform float time;
        uniform int frame;
        varying vec2 vUv;

        const float delta = 1.4;

        void main() {
            vec2 uv = vUv;
            if (frame == 0) {
                gl_FragColor = vec4(0.0);
                return;
            }

            vec4 data = texture2D(textureA, uv);
            float pressure = data.x;
            float pVel = data.y;

            vec2 texelSize = 1.0 / resolution;
            float p_right = texture2D(textureA, uv + vec2(texelSize.x, 0.0)).x;
            float p_left = texture2D(textureA, uv + vec2(-texelSize.x, 0.0)).x;
            float p_up = texture2D(textureA, uv + vec2(0.0, texelSize.y)).x;
            float p_down = texture2D(textureA, uv + vec2(0.0, -texelSize.y)).x;

            if (uv.x <= texelSize.x) p_left = p_right;
            if (uv.x >= 1.0 - texelSize.x) p_right = p_left;
            if (uv.y <= texelSize.y) p_down = p_up;
            if (uv.y >= 1.0 - texelSize.y) p_up = p_down;

            pVel += delta * (-2.0 * pressure + p_right + p_left) / 4.0;
            pVel += delta * (-2.0 * pressure + p_up + p_down) / 4.0;

            pressure += delta * pVel;
            pVel -= 0.005 * delta * pressure;
            pVel *= 1.0 - 0.002 * delta;
            pressure *= 0.999; // Reverted damping

            vec2 mouseUV = mouse / resolution;
            if(mouse.x > 0.0) {
                float dist = distance(uv, mouseUV);
                if(dist <= 0.02) { // Reverted radius (0.05 -> 0.02)
                    pressure += 2.0 * (1.0 - dist / 0.02); // Reverted intensity (4.0 -> 2.0)
                }
            }

            gl_FragColor = vec4(pressure, pVel, (p_right - p_left) / 2.0, (p_up - p_down) / 2.0);
        }
      `
    });

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D textureA;
        uniform sampler2D textureB;
        varying vec2 vUv;

        void main() {
            vec4 data = texture2D(textureA, vUv);
            vec2 distortion = 0.3 * data.zw; // Reverted distortion (0.5 -> 0.3)
            vec4 color = texture2D(textureB, vUv + distortion);

            vec3 normal = normalize(vec3(-data.z * 2.0, 0.5, -data.w * 2.0)); // Reverted normal scaling
            vec3 lightDir = normalize(vec3(-3.0, 10.0, 3.0));
            float specular = pow(max(0.0, dot(normal, lightDir)), 60.0) * 1.5; // Reverted specular highlight

            gl_FragColor = color + vec4(specular);
        }
      `,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, displayMaterial);
    scene.add(plane);

    const simScene = new THREE.Scene();
    const simPlane = new THREE.Mesh(geometry, simulationMaterial);
    simScene.add(simPlane);

    let frame = 0;
    let targetA = renderTargetA;
    let targetB = renderTargetB;

    let animationFrameId: number;

    const animate = () => {
      frame++;
      simulationMaterial.uniforms.frame.value = frame;
      simulationMaterial.uniforms.textureA.value = targetA.texture;
      
      renderer.setRenderTarget(targetB);
      renderer.render(simScene, camera);
      
      displayMaterial.uniforms.textureA.value = targetB.texture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      const temp = targetA;
      targetA = targetB;
      targetB = temp;

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Calculate normalized mouse position relative to the container
      mouseRef.current.x = (e.clientX - rect.left) * window.devicePixelRatio;
      mouseRef.current.y = (rect.bottom - e.clientY) * window.devicePixelRatio;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      simulationMaterial.uniforms.resolution.value.set(
        width * window.devicePixelRatio, 
        height * window.devicePixelRatio
      );
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [imagePath, text]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden" />;
};
