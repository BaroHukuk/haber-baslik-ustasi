# Haber Başlığı Ustası

A Turkish-language web app that drafts news headlines and full article bodies
with the x.ai Grok API. Built for newsroom workflows where a writer needs
several headline options, or a structured first draft, in seconds.

**Status:** working prototype. Runs entirely in the browser — no backend.

## What it does

**Headline generator** — enter a topic, pick a tone, get headline options:

| Tone | Use |
|---|---|
| `Clickbait` | Maximum curiosity gap |
| `SEO uyumlu` | Keyword-forward, search-friendly |
| `Nötr` | Plain, wire-service style |

**Article generator** (`/haber-olustur`) — returns a structured draft, parsed
into separate fields so each part can be copied on its own:

1. Headline
2. Spot (1–2 sentence summary)
3. Intro paragraph
4. At least two subheadings with body copy
5. Four hashtags

## Running it locally

Requires Node.js and npm.

```sh
git clone https://github.com/Fibilisim-Tekno/haber-baslik-ustasi.git
cd haber-baslik-ustasi
npm install
npm run dev
```

Then open the dev server URL. You will need an **x.ai (Grok) API key** — the
key starts with `xai-` and is entered in the app itself, not in a config file.
The **Kaydet** button stores it in `localStorage` so you do not have to retype
it.

## How it works

The browser calls `https://api.x.ai/v1/chat/completions` directly with the
`grok-3-latest` model (`temperature: 0.7`, `max_tokens: 1500`). The prompt
asks for the five numbered sections listed above, and the response is split
into fields with regular expressions before rendering.

## Known limitations

Being honest about these, because they matter if you plan to deploy it:

- **The API key lives in the browser.** It is kept in `localStorage` and sent
  from the client, so it is visible to anyone with access to the browser or
  devtools. Fine for personal or internal use; for a public deployment the
  call belongs behind a small server-side proxy.
- **Output parsing is regex-based.** When the model deviates from the expected
  numbered format, some fields come back empty rather than wrong — but they do
  come back empty.
- `index.html` sets `<base href="/haberbaslik/">`, so the build expects to be
  served from that subpath. Change it if you deploy at a domain root.

## Stack

Vite · React · TypeScript · Tailwind CSS · shadcn/ui · React Router

---

<details>
<summary>🇹🇷 Türkçe</summary>

## Ne işe yarıyor

x.ai Grok API'si ile Türkçe haber başlığı ve haber metni üreten bir web
uygulaması. Tamamen tarayıcıda çalışır, sunucu gerektirmez.

- **Başlık üretici** — konu girin, stil seçin (Clickbait / SEO uyumlu /
  Nötr), başlık seçenekleri alın.
- **Haber içeriği üretici** — başlık, spot, giriş, en az iki alt başlık ve
  dört etiket olarak ayrı ayrı kopyalanabilir bir taslak üretir.

## Kurulum

```sh
git clone https://github.com/Fibilisim-Tekno/haber-baslik-ustasi.git
cd haber-baslik-ustasi
npm install
npm run dev
```

`xai-` ile başlayan bir x.ai (Grok) API anahtarı gerekiyor. Anahtar
uygulama içinden giriliyor, **Kaydet** ile `localStorage`'a kaydediliyor.

## Bilinen sınırlar

- **API anahtarı tarayıcıda tutuluyor.** `localStorage`'da saklanıyor ve
  istek istemciden gidiyor; yani tarayıcıya erişen biri anahtarı görebilir.
  Kişisel kullanım için sorun değil, ancak herkese açık bir yayında isteğin
  sunucu tarafında bir proxy arkasına alınması gerekir.
- **Çıktı regex ile ayrıştırılıyor.** Model beklenen numaralı formatın
  dışına çıktığında bazı alanlar boş gelebilir.
- `index.html` içinde `<base href="/haberbaslik/">` tanımlı; alan adının
  kökünde yayınlayacaksanız bunu değiştirin.

</details>
