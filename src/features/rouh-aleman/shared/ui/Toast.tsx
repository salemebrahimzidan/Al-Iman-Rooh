import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type ToastVariant = 'success' | 'error'

type ToastItem = {
  id: number
  variant: ToastVariant
  message: string
}

type ToastContextValue = {
  showToast: (variant: ToastVariant, message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const AUTO_DISMISS_MS = 5000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((variant: ToastVariant, message: string) => {
    const id = ++nextId.current
    setToasts((prev) => [...prev, { id, variant, message }])
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, AUTO_DISMISS_MS)
    return () => window.clearTimeout(timer)
  }, [onDismiss])

  const isSuccess = toast.variant === 'success'

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      className={`pointer-events-auto flex max-w-md items-start gap-2 rounded-2xl border px-4 py-3 text-sm shadow-(--ra-shadow) ${
        isSuccess
          ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
          : 'border-red-200 bg-red-50 text-red-800'
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <span className="flex-1 font-medium">{toast.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded-full p-0.5 opacity-70 transition hover:opacity-100"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return ctx
}
