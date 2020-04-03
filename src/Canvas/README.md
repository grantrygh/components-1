## SPEC

1. CanvasContainer wraps all CanvasPanels and provides context for panel states
2. CanvasPanel - allow pulling left/right (outside viewport) and animate in (over other panels)

```jsx
<CanvasContainer>
    <CanvasPanel name="left" isVisible type="overlay" dir="right">
        {({ closePanel }) => (
            <div>
                This is drawer on the right side
                <br />
                <button onClick={closePanel}>Close</button>
            </div>
        )}
    </CanvasPanel>

    <CanvasPanel name="main" isVisible type="overlay" dir="right">
        {({ closePanel }) => (
            <div>
                This is drawer on the right side
                <br />
                <button onClick={closePanel}>Close</button>
            </div>
        )}
    </CanvasPanel>
</CanvasContainer>
```
