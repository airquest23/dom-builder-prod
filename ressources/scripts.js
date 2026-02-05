document.addEventListener("DOMContentLoaded", function () {
  DOM.queryAll('.pre-left').array
    .forEach(preClass => {
      preClass.event('mouseenter', (pre) => {
        DOM(pre)
          .parent().class('col-9 p-2')
          .next().class('col-3 p-2')
      });
      preClass.event('mouseleave', (pre) => {
        DOM(pre)
          .parent().class('col-6 p-2')
          .next().class('col-6 p-2')
      });
    });
  
  DOM.queryAll('.pre-right').array
    .forEach(preClass => {
      preClass.event('mouseenter', (pre) => {
        DOM(pre)
          .parent().class('col-9 p-2')
          .previous().class('col-3 p-2')
      });
      preClass.event('mouseleave', (pre) => {
        DOM(pre)
          .parent().class('col-6 p-2')
          .previous().class('col-6 p-2')
      });
    });
});