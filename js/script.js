/* eslint-disable indent */
{ 'use strict';
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-';

  const titleClickHandler = function (event) 
  {
    event.preventDefault();
    const clickedElement = this;
    
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) 
    {
      activeArticle.classList.remove('active');
    }

    /* [DONE]get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* [DONE]add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    // eslint-disable-next-line quotes
    titleList.innerHTML = "";

    let html = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(optArticleSelector + customSelector);
    for (let article of articles) 
    {
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* get the title from the title element */
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* insert link into html variable */
      html = html + linkHTML;
    }
    
    /* insert link into titleList */
    titleList.innerHTML = html;
    
    const links = document.querySelectorAll('.titles a');
    for (let link of links) 
    {
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();
  
  
  // eslint-disable-next-line no-inner-declarations
  function calculateTagsParams(tags){
    const params = {
      min: 999999,
      max: 0
    };
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;
  }

  // eslint-disable-next-line no-inner-declarations
  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
  }

  // eslint-disable-next-line no-inner-declarations
  function generateTags(){
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles) {
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        /* add generated code to html variable */
        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
            allTags[tag] = 1;
          } else {
            allTags[tag]++;
          }
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += tagLinkHTML;
    }
    /* [NEW] END LOOP: for each tag in allTags: */
    console.log(allTags)
    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }
  
  generateTags();
  
  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each active tag link */
    for (let link of activeLinks) {
      /* remove class active */
      link.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    console.log(generateTitleLinks);
  }
  
  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  // eslint-disable-next-line no-inner-declarations
  function generateAuthors(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles) {
      /* find authors wrapper */
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);
      /* make html variable with empty string */
      let html = '';
      /* change html for new links */
      authorsWrapper.innerHTML = '';
      /* get autor from data-authors attribute */
      const articleAuthors = article.getAttribute('data-author');
      /* generate HTML of the link */
      const linkHTML = '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';
      console.log('html link:', linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
      authorsWrapper.innerHTML = html;
    }
  }
  
  generateAuthors();
 
 // eslint-disable-next-line no-inner-declarations
 function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "authors" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    /* find all author links with class active */
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active author link */
  for (let activeAuthorLink of authorLinks){
    /* remove class active */
    activeAuthorLink.classList.remove('active');
  /* END LOOP: for each active author link */
  }
    /* find all autor links with "href" attribute equal to the "href" constant */
  const equalLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let equalLink of equalLinks){
    equalLink.classList.add('active');
  }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }
 
  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToAuthor(){
    /* find all links to author */
    const links = document.querySelectorAll('[href^="#author-"]');
    /* START LOOP: for each link */
      for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  } 
  }
  
  addClickListenersToAuthor();
}