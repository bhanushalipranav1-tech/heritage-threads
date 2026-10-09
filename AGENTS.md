<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the brand story on the existing `/about` route and link it from shared navigation; this preserves established URLs while providing a dedicated About Us page.
- Store uploaded artwork as asset pointers and render page copy as HTML; this keeps text accessible and adaptable to different screens.
- Keep delivery packaging selection in the shared cart context and reuse its picker in cart and inquiry; this carries a single choice through the order flow without adding checkout or packaging fees.
