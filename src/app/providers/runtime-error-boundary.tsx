import type { ReactNode } from 'react'
import React from 'react'

type Props = {
  children: ReactNode
  appName?: string
}

type State = {
  error?: Error
}

export class RuntimeErrorBoundary extends React.Component<Props, State> {
  state: State = {}

  static getDerivedStateFromError(error: unknown): State {
    return { error: error instanceof Error ? error : new Error(String(error)) }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[RuntimeErrorBoundary] Uncaught render error:', error)
    console.error('[RuntimeErrorBoundary] Component stack:', info.componentStack)
  }

  render() {
    if (this.state.error) {
      const title = this.props.appName ?? 'Rouh Al Eman'
      return (
        <div
          style={{
            padding: 16,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>
            {title} crashed during render
          </div>
          <div style={{ marginBottom: 8 }}>
            Open DevTools Console for full stack trace.
          </div>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              background: '#0b0f14',
              color: '#f7f8fa',
              padding: 12,
              borderRadius: 12,
              overflowX: 'auto',
            }}
          >
            {this.state.error.name}: {this.state.error.message}
          </pre>
        </div>
      )
    }

    return this.props.children
  }
}

