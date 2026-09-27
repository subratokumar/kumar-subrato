Kumar Subrato | Personal Profile

## Preview locally

Run this from the project folder, then open http://localhost:8000:

```powershell
python -m http.server 8000
```

## Update your profile

Edit `data.js`; the page content is kept separate from its layout and styles. Add real information only when you are ready to publish it. This site is public, so do not include private details you do not want everyone to see.

- Update `name`, `title`, `introduction`, `location`, and `photo` for the profile.
- Add personal facts as `{ label, value }` entries in `personal`.
- Add family as `{ role, name }` entries in `family`.
- Add career entries with `duration`, `role`, `organization`, and `description` in `career`.
- Add achievements with `title`, `organization`, `year`, and `description` in `achievements`.
- Add skill groups as `{ category, items: [] }` entries in `skills`.
- Add project objects with `name`, `description`, `technologies`, `github`, and `demo` in `projects`.
- Add interests to `hobbies`; add social profiles as `{ label, url }` entries in `social`.
- Add contact methods to `contact`. The form opens the visitor's email app; it does not send or store messages on a server.
- Replace the sample photo URLs in `gallery` and the `photo` URL with your own photos. Gallery images open in a next/previous lightbox.

## Publish changes

This static site is deployed at https://kumar-subrato.vercel.app. Push changes to the Git branch connected to the Vercel production project to publish them automatically. No build command or framework configuration is required.
