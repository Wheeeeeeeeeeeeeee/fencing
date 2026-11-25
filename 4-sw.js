self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch{d={title:'Fencing',body:e.data?e.data.text():''}}e.waitUntil(self.registration.showNotification(d.title||'Fencing',{body:d.body||'',icon:'/fencing/apple-touch-icon.png',tag:d.tag||('fence-'+Date.now()),data:{url:d.url||'/fencing/'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if(c.url.indexOf(self.registration.scope)===0&&'focus'in c)return c.focus()}return clients.openWindow(self.registration.scope)}))});
