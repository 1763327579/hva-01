const $siteList=$(".siteList");
const $lastList=$siteList.find('li.last');
const x=localStorage.getItem('x');
console.log(x);
const xObject=JSON.parse(x);
const hashMap=xObject||[
    {logo:"A",url:"https://www.acfun.cn"},
    {logo:"B",url:"https://www.bilibili.com"}

];
const simplifyUrl=(url)=>{   
debugger;
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'');//删除／开头的
};
const render=()=>{
    $siteList.find('li:not(.last)').remove()       
    hashMap.forEach((node, index) => {
        debugger;
        console.log(index); 
    const $li=$(`<li>
      <div class="site">
        <div class="logo">  
            ${node.logo}
        </div>
        <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon">
                <use xlink:href="#icon-close"></use>
            </svg>
            </div>
        </div>
    
  </li>`).insertBefore($lastList)
  
  $li.on('click', () => {
    window.open(node.url)
  })     
  $li.on('click', '.close', (e) => {
      debugger;
    e.stopPropagation() // 阻止冒泡
    hashMap.splice(index, 1)
    render()
  })
})
}
render();
$(".addButton").on('click',()=>{
    let url=window.prompt('请问你要添加网址是什么'); 
    if(url.indexOf('http')!==0){
      url="https://"+url;
    }  
    debugger;
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),url:url   
    });
    render();
})

window.onbeforeunload=()=>{
    const string =JSON.stringify(hashMap); 
    localStorage.setItem('x',string);
}      
$(document).on('keypress',(e)=>{
    const {key}=e;
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toUpperCase()===key){
          window.opene(hashMap[i].url);
        }

    }
})