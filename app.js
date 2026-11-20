const firmwareList=['5.05','6.00','6.02','6.20','6.50','6.51','6.70','6.71','6.72','7.00','7.01','7.02','7.50','7.51','7.55','8.00','8.01','8.03','8.50','8.52','9.00','9.03','9.04','9.50','9.51','9.60','10.00','10.01','10.50','10.70','10.71','11.00','11.02','11.50','12.00','12.02','12.50','13.00','13.02','13.04','13.50','13.52'];
// Official GoldHEN v2.4b18 supported firmware list from its release notes.
const official=new Set(['5.05','6.71','6.72','9.00','9.60','10.00','10.01','10.50','10.70','10.71','11.00']);
// PS4 AIO published host-flow groups. These indicate an upstream host route, not a guarantee of GoldHEN support.
function hostFlow(v){
 const n=Number(v);
 if(v==='5.05')return 'هاست اختصاصی 5.05';
 if(v==='6.72')return 'هاست اختصاصی 6.72';
 if(n>=7&&n<=8.52)return 'PSFree + Lapse';
 if(n>=9&&n<=9.60)return 'PSFree + Lapse';
 if(n>=6&&n<=11.02)return 'CSSFontFace + Lapse/Poops';
 if(n>=11&&n<=13.00)return 'Slopkit + Lapse/Poops';
 if(n>=13.02&&n<=13.52)return 'Slopkit Relapse';
 return 'مسیر مشخص نشده';
}
const $=s=>document.querySelector(s);
let selected=localStorage.getItem('ag-fw')||'9.00';
if(!firmwareList.includes(selected))selected='9.00';
function statusOf(v){return official.has(v)?'official':hostFlow(v)!=='مسیر مشخص نشده'?'community':'unknown'}
function renderFirmware(filter=''){
 const grid=$('#firmwares');grid.replaceChildren();
 const items=firmwareList.filter(v=>v.includes(filter.trim()));
 items.forEach(v=>{const b=document.createElement('button');b.textContent=v;b.className=(v===selected?'active ':'')+statusOf(v);b.title=statusOf(v)==='official'?'درج‌شده در فهرست رسمی GoldHEN 2.4b18':statusOf(v)==='community'?'گزارش پروژه جامعه؛ بررسی مستقل لازم است':'سازگاری تأیید نشده';b.onclick=()=>selectFirmware(v);grid.append(b)});
 $('#fwCount').textContent=items.length+' نسخه';$('#selected').textContent=selected;updateCompat();
}
function selectFirmware(v){selected=v;localStorage.setItem('ag-fw',v);renderFirmware($('#fwSearch').value);$('#runState').textContent='فریمور '+v+' انتخاب شد';$('#runDetail').textContent='وضعیت: '+labelStatus(statusOf(v));}
function labelStatus(s){return s==='official'?'پشتیبانی در فهرست رسمی GoldHEN 2.4b18':s==='community'?'مسیر هاست در PS4 AIO؛ GoldHEN ممکن است پشتیبانی نکند':'مسیر مشخص و تأییدشده در این داده‌ها ثبت نشده'}
function updateCompat(){const s=statusOf(selected);$('#compatTitle').textContent=labelStatus(s);$('#compatBox').className='compat '+s;
 $('#compatText').textContent=s==='official'?'این نسخه در فهرست رسمی GoldHEN 2.4b18 آمده است. مسیر پیشنهادی هاست: '+hostFlow(selected)+'. فایل‌های لازم و تست روی کنسول همچنان ضروری است.':s==='community'?'مسیر هاست معرفی‌شده در PS4 AIO: '+hostFlow(selected)+'. این موضوع به معنی پشتیبانی GoldHEN نیست؛ باید HEN/Payload سازگار با همین نسخه جداگانه تأیید شود.':'برای این نسخه در داده‌های فعلی مسیر مشخصی ثبت نشده است. انتخاب آن به معنی پشتیبانی یا امکان جیلبریک نیست.';}
function renderMatrix(){const box=$('#matrix');box.replaceChildren();firmwareList.forEach(v=>{const d=document.createElement('div');d.className='matrix-item '+statusOf(v);d.innerHTML='<b>'+v+'</b><small>'+(statusOf(v)==='official'?'رسمی':statusOf(v)==='community'?'جامعه':'تأییدنشده')+'</small>';box.append(d)})}
$('#fwSearch').addEventListener('input',e=>renderFirmware(e.target.value));renderFirmware();renderMatrix();
function connection(){const online=navigator.onLine;$('#connection').textContent=online?'آنلاین':'آفلاین';$('#dot').style.background=online?'#5bd49b':'#e8c36e'}window.addEventListener('online',connection);window.addEventListener('offline',connection);connection();
const CACHE='amirgem-host-v3';const files=['./','./index.html','./style.css','./app.js','./manifest.webmanifest'];
async function check(){if(!('caches'in window)){$('#cacheState').textContent='مرورگر Cache API ندارد';return}
 const c=await caches.open(CACHE);const n=(await Promise.all(files.map(x=>c.match(x)))).filter(Boolean).length;
 $('#cacheState').textContent=n===files.length?'همه فایل‌های رابط ذخیره شده‌اند':'کش رابط ناقص است';
 $('#progress').style.width=(n/files.length*100)+'%';$('#cacheDetail').textContent=`${n} از ${files.length} فایل رابط در کش است. فایل اکسپلویت یا Payload در این شمارش وجود ندارد.`}
$('#check').onclick=check;
$('#cache').onclick=async()=>{try{if(!('serviceWorker'in navigator))throw new Error('Service Worker پشتیبانی نمی‌شود');await navigator.serviceWorker.register('./sw.js');await navigator.serviceWorker.ready;await check();$('#cacheDetail').textContent+=' ذخیره‌سازی/به‌روزرسانی کش انجام شد.'}catch(e){$('#cacheState').textContent='ذخیره‌سازی ناموفق';$('#cacheDetail').textContent=e.message}};
function modal(title,text){$('#modalTitle').textContent=title;$('#modalText').textContent=text;$('#modal').hidden=false}
function close(){ $('#modal').hidden=true }$('#close').onclick=close;$('#ok').onclick=close;$('#modal').onclick=e=>{if(e.target.id==='modal')close()};
$('#run').onclick=()=>{const s=statusOf(selected);const msg=s==='official'?'GoldHEN v2.4b18 این فریمور را رسماً فهرست کرده است. مسیر هاست: '+hostFlow(selected)+'. این بسته هنوز exploit chain و payload اجرایی را همراه ندارد.':s==='community'?'مسیر هاست PS4 AIO برای این فریمور: '+hostFlow(selected)+'. این موضوع پشتیبانی رسمی GoldHEN را ثابت نمی‌کند؛ نوع HEN/Payload باید جداگانه بررسی شود.':'در داده‌های فعلی مسیر مشخصی برای این فریمور ثبت نشده است. از انتخاب نسخه نتیجه نگیرید که جیلبریک قابل اجراست.';
 $('#runState').textContent=labelStatus(s);$('#runDetail').textContent='فریمور انتخاب‌شده: '+selected;modal('گزارش سازگاری · FW '+selected,msg)};
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').then(check).catch(()=>{});else $('#cacheState').textContent='برای کش آفلاین، سایت را با HTTPS باز کنید.';
