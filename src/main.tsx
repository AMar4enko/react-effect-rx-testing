import ReactDOM from 'react-dom/client'
import Application from './Application.tsx'

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<Application />)
}
