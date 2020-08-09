{
    const optArticleSelector = ".post",
        optTitleSelector = ".post-title",
        optTitleListSelector = ".titles";

    /* 
      Tutaj podobnie jak poprzednio - przeniosłem zmienne na górę. W tych 3 zmiennych przechowujemy klasy które przydadzą się nam w poniższym zadaniu.
      Zapisywanie klas do zmiennych ma jeden zasadniczy plus - jeżeli coś się zmienia to edytujesz tylko zmienną powyżej - nie musisz ręcznie podmieniać we wszystkich wystąpieniach klasy w kodzie.
      */

    const titleClickHandler = function (event) {
        /* Deklaracja pierwszej zmiennej - korzystamy z tej konstrukcji  function (event) bo wiemy że funkcja jest odpalana po kliknięciu w link */

        event.preventDefault();

        /* 
            function (event) było nam potrzebne żeby móc podziałać na samym evencie - czyli w tym wypadku kliknięciu. Kiedy klikamy w button jak w Kamień/Papier czy np. div nic się nie dzieje.
            W tym wypadku klikamy jednak w link (<a>) i przeglądarka domyślnie po kliknięciu w link chce zawsze odświeżyć stronę lub przeskrolować ją na górę - chcemy tego uniknąć.
            Dlatego dajemy tę linię event.preventDefault(); - musisz ją zapamiętać - ona blokuje domyślnie działania na kliknięcie.
            */

        const clickedElement = this;

        /* W obrębie tej funkcji this to aktualnie kliknięty link - zapisujemy go do zmiennej pomocniczej, której nazwa clickedElement ma nam podpowiadać jej zastosowanie */

        const activeLinks = document.querySelectorAll(".titles a.active");
        /* Zapisujemy do zmiennej pomocniczej activeLinks wszystkie linki o klasie .active które znajdują się w .titles */
        for (let activeLink of activeLinks) {
            /* Ta pętla przechodzi przez wszystkie linki z klasą .active które zostały zapisany w zmiennej activeLinks i dla każdego z nich (activeLink) wykonuje określone działanie */
            activeLink.classList.remove("active");
            /* Każdemu z linków odbieramy klasę .active - robimy to bo zaraz będziemy ją nadawać na nasz kliknięty przed chwilą link */
        }

        clickedElement.classList.add("active");
        /* Dodajemy klasę .active na nasz kliknięty link */

        const activeArticles = document.querySelectorAll(".posts article.active");
        /* Podobnie jak wyżej, z tą różnicą że szukamy teraz artykułów które mają klasę .active (czyli są wyświetlone) i zapisujemy je do zmiennej activeArticles */

        for (let activeArticle of activeArticles) {
            /* Przechodzimy przez te artykuły */
            activeArticle.classList.remove("active");
            /* Usuwamy z każdego z nich klasę .active */
        }

        const articleSelector = clickedElement.getAttribute("href");
        /* Tutaj dzieje się mała magia - pobieramy z naszego klikniętego linku href - czyli np. #temat - mamy więc w zmiennej articleSelector wartość href  */

        const targetArticle = document.querySelector(articleSelector);
        /* #temat poza tym że jest hrefem - jest też ID konkretnego artykułu - dlatego za jego pomocą szukamy artykuł o określonym ID na stronie i zapisujemy go do zmiennej pomocniczej targetArticle */
        targetArticle.classList.add("active");
        /* Dodajemy naszemu artykułowi do którego kierował kliknięty link klasę .active tak żeby się wyświetlił */
    };

    const links = document.querySelectorAll(".titles a");
    /* 
      Wyżej mamy funkcje która działa po kliknięciu w link w tytule, trzeba ją jednak podpiąć pod te linki.
      W tym celu zbieramy do zmiennej link wszystkie linki znajdujące się w .titles
      */

    for (let link of links) {
        /* Przechodzimy przez każdy z nich i dodajemy mu po klinięciu funkcję titleClickHandler */
        link.addEventListener("click", titleClickHandler);
    }

    function generateTitleLinks() {
        const titleList = document.querySelector(optTitleListSelector);
        /* Zapisujesz do zmiennej titleList wszystkie elementy o klasie .titles znajdujacej sie w zmiennej optTitleListSelector */
        titleList.innerHTML = "";
        /* Usuwamy wszystkie statycznie napisane w HTML tytuły, div .titles będzie teraz pusty */

        const articles = document.querySelectorAll(optArticleSelector);
        /* Zapisujesz do zmiennej articles wszystkie artykuły które mamy na stronie (elementy o klasie .post z optArticleSelector) */
        for (let article of articles) {
            /* Przechodzimy teraz przez wszystkie wyłapane artykuły (article to pojedynczy artykuł) */
            const articleId = article.getAttribute("id");
            /* Wyjmujemy z każdego artykułu jego ID - jest to nam potrzebne, ponieważ tak jak wyżej pisałem ID = href linka więc mając ID artykułu wiemy jaki href musi mieć link który będziemy zaraz generować */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /* Wyłapujemy do zmiennej articleTitle element o klasie .post-title znajdujący się w optTitleSelector . To jest miejsce gdzie gdzie przechowywany jest tytuł danego artykułu, to będzie treść naszego linka potem.  */
        }

        /* get the title from the title element */

        /* create HTML of the link */

        /* insert link into titleList */
    }
    generateTitleLinks();
}
