import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      // Posisi toast (opsional, bottom-right biasanya lebih clean)
      position="bottom-right"
      // Gap antar toast
      gap={8}
      toastOptions={{
        classNames: {
          toast:
            // BASE STYLES
            'group toast group-[.toaster]:bg-background/90 group-[.toaster]:backdrop-blur-md group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl ' +
            // SHAPE & LAYOUT
            'group-[.toaster]:rounded-xl group-[.toaster]:p-4 group-[.toaster]:items-start ' +
            // TYPE SPECIFIC BORDERS (Optional: Biar error merah, success hijau dikit)
            'data-[type=error]:group-[.toaster]:border-red-500/20 ' +
            'data-[type=success]:group-[.toaster]:border-green-500/20 ' +
            'data-[type=warning]:group-[.toaster]:border-yellow-500/20',

          description:
            'group-[.toast]:text-muted-foreground group-[.toast]:text-xs group-[.toast]:mt-0.5',

          title:
            'group-[.toast]:text-sm group-[.toast]:font-semibold group-[.toast]:text-foreground',

          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:text-xs group-[.toast]:font-medium group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:rounded-md',

          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:text-xs group-[.toast]:font-medium group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:rounded-md',

          // Styling untuk icon default bawaan Sonner
          icon: 'group-data-[type=error]:text-red-500 group-data-[type=success]:text-green-500 group-data-[type=warning]:text-yellow-500',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
