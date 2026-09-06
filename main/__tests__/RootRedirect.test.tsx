import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Home from '../pages/index'

// The <noscript> fallback link never mounts under jsdom — React (matching
// real-browser behavior with JS enabled) skips rendering into <noscript> on
// the client, so RTL sees it permanently empty. Assert on the *returned
// element tree* instead of a render, same technique as Document.test.tsx.
describe('war.re root redirect shell', () => {
  it('meta-refreshes to the content route', () => {
    const tree = Home() as React.ReactElement<{ children: React.ReactNode }>
    const [head] = React.Children.toArray(tree.props.children) as React.ReactElement<{
      children: React.ReactNode
    }>[]
    expect(head.type).toBe(Head)

    const headChildren = React.Children.toArray(head.props.children) as React.ReactElement<
      Record<string, unknown>
    >[]
    const refresh = headChildren.find((child) => child.props.httpEquiv === 'refresh')
    expect(refresh?.props.content).toBe('0; url=/n')

    const canonical = headChildren.find((child) => child.props.rel === 'canonical')
    expect(canonical?.props.href).toBe('https://war.re/n')
  })

  it('provides a noscript fallback link to the content route', () => {
    const tree = Home() as React.ReactElement<{ children: React.ReactNode }>
    const [, noscript] = React.Children.toArray(tree.props.children) as React.ReactElement<{
      children: React.ReactNode
    }>[]
    expect(noscript.type).toBe('noscript')

    const link = React.Children.only(noscript.props.children) as React.ReactElement<{
      href: string
      children: React.ReactNode
    }>
    expect(link.type).toBe(Link)
    expect(link.props.href).toBe('/n')
    expect(link.props.children).toBe('Click here to go to the main site')
  })
})
