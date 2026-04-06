# Site Setup

## 1. 案件基本情報

- 案件名：yakitori-akashi-01
- 店舗名：炭火やきとり みのり
- 会社名：
- 公開URL：https://yakitori-akashi.remedora.jp
- canonical URL：https://yakitori-akashi.remedora.jp/
- title：炭火やきとり みのり | 明石でゆっくり楽しむ焼き鳥
- meta description：明石で焼き鳥を楽しむなら、炭火やきとり みのり。落ち着いた店内で、一本ずつ丁寧に焼き上げた焼き鳥と一品料理をお楽しみいただけます。
- OGP画像：assets/images/ogp.jpg
- faviconファイル名：favicon.ico
- apple-touch-icon ファイル名：apple-touch-icon.png
- 電話番号：078-000-0000
- 住所：兵庫県明石市○○1-2-3
- 営業時間：17:00〜23:00
- 定休日：水曜日
- GA4 ID：G-ABCDEFG123
- GAS URL：https://script.google.com/macros/s/XXXXXXXX/exec
- メインカラー：#1f1a17
- フッター背景色：#16110f
- メインHero画像：assets/images/hero.jpg

---

## 2. head反映管理

### 2-1. 反映対象
以下は原則、全ページの `<head>` に反映する。

- title
- meta description
- canonical
- OGP
- favicon
- apple-touch-icon

### 2-2. canonicalルール
- 公開URLと完全一致させる
- 末尾スラッシュ有無を案件内で統一する
- 開発中の仮URLや GitHub Pages のURLを残さない
- OGP URL と食い違わせない

### 2-3. faviconルール
- タブに正しく表示されること
- 404になっていないこと
- OGP画像と混同しないこと
- 差し替え後はキャッシュ込みで再確認すること

### 2-4. apple-touch-icon ルール
- iPhone系のホーム画面追加を想定した画像を使う
- faviconと別管理でもよいが、案件内で意図を持って使う
- 404になっていないこと

---

## 3. bodyクラス運用

### 3-1. 基本構成
すべてのページの `<body>` は以下の構成を守る。

- `site`
- `site--[案件名]`
- `page`
- `page--home`
- `page--service`
- `page--contact`
- `page--privacy`

### 3-2. マスター時の例
- home：
  - `site site--starter page page--home`
- service：
  - `site site--starter page page--service`
- contact：
  - `site site--starter page page--contact`
- privacy：
  - `site site--starter page page--privacy`

### 3-3. 案件複製後の例
- home：
  - `site site--yakitori-akashi-01 page page--home`
- service：
  - `site site--yakitori-akashi-01 page page--service`
- contact：
  - `site site--yakitori-akashi-01 page page--contact`
- privacy：
  - `site site--yakitori-akashi-01 page page--privacy`

### 3-4. 運用ルール
- 複製直後の `site--starter` のまま公開しない
- 案件化したら `site--[案件名]` に置き換える
- `site` は消さない
- `page--home` などページ識別クラスはページごとに正しく付ける
- 案件差分CSSは body案件クラス配下で閉じる
- bodyクラス名を途中で増やしすぎない

---

## 4. CSS運用固定ルール

### 4-1. `sections.css` の役割
`sections.css` は以下の2層を持つ。

- 上部：starter共通セクションスタイル
- 下部：`Project Custom` ブロック以降の案件差分

案件中にAIが編集してよいのは、原則 `Project Custom` ブロック以降のみ。

### 4-2. default modifier class 運用
今後よく差別化するセクションには、既存クラスを壊さず modifier class を追加して運用する。

例：
- `hero hero--default`
- `cta-section cta-section--default`
- `faq-container faq-container--default`
- `service-list service-list--default`

差別化時は、既存クラスを削除して置き換えるのではなく、必要に応じて案件専用 modifier を追加・差し替えする。

### 4-3. inline style 禁止
以下はHTMLに直接書かない。必ずCSSへ逃がす。

- 背景画像
- 色指定
- margin / padding
- 見出し装飾
- CTA文字色
- 仮画像の見た目指定

---

## 5. JS運用固定ルール

### 5-1. `main.js` 保護対象
以下は `main.js` が依存するため、削除・変更禁止。

- `[data-js="menu-toggle"]`
- `[data-js="mobile-nav"]`
- `[data-js="faq-button"]`
- `[data-js="contact-form"]`
- `[data-js="thanks-message"]`
- `#submitBtn`
- `#formMessage`

### 5-2. 運用ルール
- class名変更に合わせて、上記 selector / id を勝手に変えない
- HTML整理時に data-js 属性を消さない
- ボタンやフォームを差し替える時も id を維持する
- 挙動追加が必要でも、まずCSSで解決を検討する
- `main.js` のコアロジックには案件演出を追記しない
- 必要最小限の追加演出だけ `assets/js/custom-anim.js` を新設して分離する

---

## 6. 共通部分を触った時の確認

以下を触った時は、必ず4ページ全部確認する。

- header
- nav
- footer
- 共通CTA導線
- 共通テキストリンク

---

## 7. セクション差別化の原則

今後の差別化は、以下をセクション単位で行う。

- Hero
- Cards
- CTA
- FAQ
- Contact冒頭文

ルール：
- 1回のAI依頼は1テーマのみ
- HTML全文は禁止
- 局所HTMLと `sections.css` 差分だけを扱う

---

## 8. GAS_URL / gas.txt 管理

### 8-1. `assets/js/gas.txt` の扱い
- `assets/js/gas.txt` は実行ファイルではなく、GASまわりの控え・参考メモとして扱う
- 公開サイトの送信先として実際に参照される本体は `assets/js/main.js` 側の `GAS_URL`
- `gas.txt` に情報を書いても、それだけでは公開サイトの送信先は変わらない
- 送信先変更時は必ず `main.js` の `GAS_URL` を変更する
- `site-setup.md` にも同じURLを記録し、ズレを防ぐ
- 案件ごとにURLを使い回すか、新規発行かを明記する
- 変更後は必ずフォーム送信テストを行う

### 8-2. GAS関連の記録欄
- 使用する `GAS_URL`：
- `main.js` 反映済み：
  - [ ] 済
- `site-setup.md` 反映済み：
  - [ ] 済
- テスト送信日時：
- テスト結果：
- 備考：

---

## 9. 公開前チェック

### 9-1. head / URL
- [ ] canonical を全ページに入れた
- [ ] canonical が公開URLと一致している
- [ ] favicon を全ページに入れた
- [ ] apple-touch-icon を全ページに入れた

### 9-2. body / CSS / JS
- [ ] bodyクラスが `site--starter` のまま残っていない
- [ ] 各ページの `page--*` クラスが正しい
- [ ] `main.js` 保護対象 selector / id を壊していない
- [ ] `sections.css` の案件差分が `Project Custom` 以降に閉じている
- [ ] inline style を増やしていない

### 9-3. フォーム / 計測
- [ ] `GAS_URL` を `main.js` に反映した
- [ ] `site-setup.md` の記録と `main.js` の `GAS_URL` が一致している
- [ ] 送信テスト済み
- [ ] GA4 ID を反映した
- [ ] 必要な計測確認を行った

### 9-4. 表示 / 導線
- [ ] header / nav / footer を4ページ確認した
- [ ] 共通CTA導線を確認した
- [ ] 共通テキストリンクを確認した
- [ ] スマホ表示を確認した
- [ ] Hero / CTA / FAQ が案件専用に見える