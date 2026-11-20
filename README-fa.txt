AmirGem Host — تست اولیه PS4 Firmware 9.00

این بسته یک workflow می‌سازد که سورس عمومی kmeps4/PSFree را هنگام انتشار دریافت می‌کند
و همان فایل‌های upstream را بدون تغییر روی GitHub Pages منتشر می‌کند.

نصب:
1) فایل ZIP را باز کن.
2) فایل .github/workflows/pages.yml را با همین مسیر داخل مخزن golden قرار بده.
   در GitHub گزینه Add file > Create new file را بزن و مسیر
   .github/workflows/pages.yml را وارد کن؛ متن فایل را کپی و Commit کن.
3) در Settings > Pages، Source را روی GitHub Actions بگذار.
4) از Actions، گردش Deploy AmirGem PS4 9.00 Host را اجرا کن.

توجه:
- این نسخه برای تست انتشار خود میزبان upstream است؛ هنوز پوسته اختصاصی AmirGem روی آن اعمال نشده.
- سورس upstream خودش WIP است و README آن حدود 80٪ پایداری ادعا می‌کند؛ موفقیت روی هر کنسول تضمین نیست.
- مجوز upstream در مخزن AGPL-3.0 است؛ فایل LICENSE و COPYING همراه خروجی منتشر می‌شوند.
- هیچ exploit یا payloadی توسط این workflow بازنویسی نمی‌شود؛ فایل‌های مخزن اصلی عیناً دریافت می‌شوند.







