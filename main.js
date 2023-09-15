import $ from "jquery"
import './style.sass'

// define custom tag
let material = ['example', 'definition', 'theorem', 'lemma', 'proposition', 'corollary', 'conjecture', 'remark']

// add page number
let counter = 1
let $page = $('page')
for (let i of $('page')) {
  $(i).after(`<footer>${counter++} of ${$page.length}</footer>`)
}


// link citations to references
for (let i of $('cite')) {
  $(i).html(function (_, oldHtml) {
    let tmp = JSON.parse(oldHtml)
    return '[' + tmp.map(i => `<a href="#r${i}">${i}</a>`).join(', ') + ']';   
  });
}

// add id to references
$('references table tr').each(function() {
  
  var citationID = $(this).find('td:first-child').text();
  let tmp = JSON.parse(citationID)
  $(this).attr('id', `r${tmp[0]}`);
});

// numbering of sections
counter = 1
for (let i of $('section')) {
  if ($(i).find('header').length > 0) {
    $(i).attr('id', `s${counter}`);
    $(i).attr('des', `s${counter}`);
    $(i).find('header h3').prepend(`${counter++}&nbsp;&nbsp;&nbsp;&nbsp;`);
  } else {
    $(i).attr('des', `s${counter-1}`);
  }
}



// numbering of materials
counter = 1;

$('section').each(function (_, section) {
  const $section = $(section);
  const hasHeader = $section.find('header').length > 0;

  if (hasHeader) {
    counter = 1;
  }

  $section.find('*').each(function (_, tag) {
    const $tag = $(tag);
    const tagName = tag.tagName.toLowerCase();

    if (material.includes(tagName) && $tag.find('strong').length > 0) {
      const sectionNumber = $tag.closest('section').attr('des').slice(1);
      $tag.attr('id', `${tagName[0]}${sectionNumber}.${counter}`);
      $tag.find('strong').append(` ${sectionNumber}.${counter++}.&nbsp;&nbsp;`);
    }
  });
});



// numbering of materials with headers
// counter = 1;

// $('section').each(function (_, section) {
//   const $section = $(section);
//   const hasHeader = $section.find('header').length > 0;

//   if (hasHeader) {
//     counter = 1;
//   }

//   $section.find('*').each(function (_, tag) {
//     const $tag = $(tag);
//     const tagName = tag.tagName.toLowerCase();

//     if (material.includes(tagName)) {
//       const sectionNumber = $tag.closest('section').attr('des').slice(1);
//       $tag.attr('id', `${tagName[0]}${sectionNumber}.${counter}`);
//       $tag.find('p:first').prepend(`<strong>${capitalizeFirstLetter(tagName)} ${sectionNumber}.${counter++}</strong>.&nbsp;&nbsp;`);
//     }
//   });
// });

// // util function
// function capitalizeFirstLetter(text) {
//   return text.charAt(0).toUpperCase() + text.slice(1);
// }
