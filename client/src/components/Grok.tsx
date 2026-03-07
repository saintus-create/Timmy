import {
  ThreadPrimitive,
  ComposerPrimitive,
  useAssistantState,
  useMessage,
} from "@assistant-ui/react";
import { Mic, ArrowUp, Square } from "lucide-react";

const GrokLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Simple placeholder logo - replace with actual Grok logo */}
    <circle cx="12" cy="12" r="10" />
    <text x="12" y="16" textAnchor="middle" fontSize="12" fill="white">G</text>
  </svg>
);

const ChatMessage = () => {
  const message = useMessage();

  return (
    <div className="message mb-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          {message.role === 'user' ? 'U' : 'A'}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-900 dark:text-gray-100">
            {message.content.map((part: any) => part.text || '').join('')}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Grok = () => {
  const isEmpty = useAssistantState((s) => s.thread.isEmpty);

  return (
    <ThreadPrimitive.Root className="flex h-full flex-col bg-[#fdfdfd] px-4 dark:bg-[#141414]">
      {isEmpty ? (
        <div className="flex h-full flex-col items-center justify-center">
          <GrokLogo className="mb-6 h-10 text-[#0d0d0d] dark:text-white" />
          <Composer />
        </div>
      ) : null}

      <ThreadPrimitive.Viewport className="flex grow flex-col overflow-y-scroll pt-16">
        <ThreadPrimitive.Messages components={{ Message: ChatMessage }} />
      </ThreadPrimitive.Viewport>
      <Composer />
    </ThreadPrimitive.Root>
  );
};

const Composer = () => {
  const isEmpty = useAssistantState((s) => s.composer.isEmpty);
  const isRunning = useAssistantState((s) => s.thread.isRunning);

  return (
    <ComposerPrimitive.Root
      className="group/composer mx-auto mb-3 w-full max-w-3xl"
      data-empty={isEmpty}
      data-running={isRunning}
    >
      <div className="flex items-center rounded-4xl bg-[#f8f8f8] ring-1 ring-[#e5e5e5] ring-inset dark:bg-[#212121] dark:ring-[#2a2a2a] px-4 py-2">
        <ComposerPrimitive.Input
          placeholder="What do you want to know?"
          className="flex-1 bg-transparent text-[#0d0d0d] outline-none dark:text-white"
        />
        {/* Animated button with three states */}
        <div className="relative h-9 w-9 rounded-full bg-[#0d0d0d] dark:bg-white ml-2">
          <button className="absolute inset-0 flex items-center justify-center transition-opacity group-data-[empty=false]/composer:opacity-0">
            <Mic />
          </button>
          <ComposerPrimitive.Send className="absolute inset-0 flex items-center justify-center transition-opacity group-data-[empty=true]/composer:opacity-0">
            <ArrowUp />
          </ComposerPrimitive.Send>
          <ComposerPrimitive.Cancel className="absolute inset-0 flex items-center justify-center transition-opacity group-data-[running=false]/composer:opacity-0">
            <Square />
          </ComposerPrimitive.Cancel>
        </div>
      </div>
    </ComposerPrimitive.Root>
  );
};