import React from 'react'
import Document from '../pages/_document'
import { themeInitScript } from '@/lib/theme'

// `<Html>`/`<Main>`/`<NextScript>` throw when actually rendered outside
// Next's own document renderer ("<Html> should not be imported outside of
// pages/_document"), and ESLint's next/core-web-vitals config enforces the
// same rule on the import itself — so this asserts on the *returned element
// tree* (a plain `React.createElement` graph; calling `Document()` never
// invokes those components' render functions) by component name, without
// importing next/document here at all.
function typeName(element: React.ReactElement): string {
  return typeof element.type === 'string' ? element.type : (element.type as { name: string }).name
}

describe('_document', () => {
  it('sets the document language', () => {
    const tree = Document() as React.ReactElement<{ lang: string }>
    expect(typeName(tree)).toBe('Html')
    expect(tree.props.lang).toBe('en')
  })

  it('disables telephone/date/email/address format detection', () => {
    const tree = Document() as React.ReactElement<{ children: React.ReactNode }>
    const head = (
      React.Children.toArray(tree.props.children) as React.ReactElement[]
    )[0] as React.ReactElement<{
      children: React.ReactNode
    }>
    const formatDetection = React.Children.only(head.props.children) as React.ReactElement<{
      name: string
      content: string
    }>
    expect(formatDetection.props.name).toBe('format-detection')
    expect(formatDetection.props.content).toBe('telephone=no, date=no, email=no, address=no')
  })

  it('embeds the theme-init script before Main so it runs before hydration', () => {
    const tree = Document() as React.ReactElement<{ children: React.ReactNode }>
    const body = (React.Children.toArray(tree.props.children) as React.ReactElement[]).find(
      (child) => typeName(child) === 'body'
    ) as React.ReactElement<{ children: React.ReactNode }>
    expect(body).toBeDefined()

    const bodyChildren = React.Children.toArray(body.props.children) as React.ReactElement[]
    const scriptIndex = bodyChildren.findIndex((child) => typeName(child) === 'script')
    const mainIndex = bodyChildren.findIndex((child) => typeName(child) === 'Main')

    expect(
      (bodyChildren[scriptIndex].props as { dangerouslySetInnerHTML: { __html: string } })
        .dangerouslySetInnerHTML.__html
    ).toBe(themeInitScript)
    expect(scriptIndex).toBeGreaterThanOrEqual(0)
    expect(scriptIndex).toBeLessThan(mainIndex)
    expect(bodyChildren.some((child) => typeName(child) === 'NextScript')).toBe(true)
  })
})
