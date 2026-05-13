import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

/**
 * Input — editorial form field. Hard-edged border, mono label on top.
 * Always pair with a visible label (accessibility) — placeholders are
 * decorative, never replacements for labels.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className, id: idProp, ...rest },
  ref,
) {
  const auto = useId();
  const id = idProp ?? auto;
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[10.5px] uppercase tracking-eyebrow text-muted"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-12 px-3.5 bg-paper border border-ink text-[15px] font-sans text-ink",
          "placeholder:text-muted/70",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spine focus-visible:border-spine",
          error && "border-warn focus-visible:ring-warn focus-visible:border-warn",
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={`${id}-err`} className="font-mono text-[10.5px] uppercase tracking-wider text-warn">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="font-mono text-[10.5px] uppercase tracking-wider text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
