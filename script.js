document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATA ---
    const flashcardData = [
        { "ID": 1, "Question": "What is the definition of \"Open Access\" (OA)?", "Answer": "**Open Access** refers to the practice of making scholarly research **freely available and reusable on the web**." },
        { "ID": 2, "Question": "What two types of barriers does OA remove to promote broader access to research?", "Answer": "OA promotes broader access by **removing price barriers** and **removing permission barriers**." },
        { "ID": 3, "Question": "What types of scholarly works can OA be applied to?", "Answer": "OA can be applied to **journal articles, theses and dissertations, monographs and book chapters, and research data**." },
        { "ID": 4, "Question": "What is Gold OA?", "Answer": "**Gold OA** refers to access provided through publication in an **open access forum, whether a journal or a monograph**." },
        { "ID": 5, "Question": "What is Green OA?", "Answer": "**Green OA** refers to access provided through **self-archiving**, often utilizing an institutional repository, such as NYU's Faculty Digital Archive." },
        { "ID": 6, "Question": "What is self-archiving, which is central to Green OA?", "Answer": "Self-archiving is the practice of **depositing an open version of your work online**. It provides a means to make work OA, even when publishing in a subscription journal." },
        { "ID": 7, "Question": "Name three possible channels authors can use to self-archive their work for Green OA.", "Answer": "Channels to self-archive include using an **institutional repository** (like NYU's Faculty Digital Archive), using a **subject-based repository** (such as PubMed Central or ArXiv), or publishing on your **own website or online profile**." },
        { "ID": 8, "Question": "Name one tool that helps authors determine if their journal permits self-archiving.", "Answer": "One tool is the **Open Policy Finder**, a database that helps you find out if your journal permits self-archiving, and if so, what version they allow. Another tool is **ShareYourPaper.org** (in beta), which verifies the version your journal allows for self-archiving." },
        { "ID": 9, "Question": "What is Hybrid OA?", "Answer": "**Hybrid OA** is a practice of publishers of traditional toll-access journals, in which the publisher offers authors an option to make their **individual article open access, usually for a fee**." },
        { "ID": 10, "Question": "Define a Preprint and a Postprint.", "Answer": "A **Preprint** is a version of a scholarly work that has been **submitted for peer review**. A **Postprint** is a version that includes all changes from peer review, but **has not been formatted or copyedited for publication**." },
        { "ID": 11, "Question": "What role does the non-profit organization Creative Commons play in Open Access publishing?", "Answer": "**Creative Commons** creates licenses that authors and copyright holders can use to grant **upfront permission to reuse their work**." },
        { "ID": 12, "Question": "Name one Open Access publisher listed in the sources that focuses on monographs.", "Answer": "**Open Book Publishers** is noted as one of the biggest open access academic publishers of monographs. **Lever Press** also publishes open access monographs." },
        { "ID": 13, "Question": "What defines a \"predatory publisher\"?", "Answer": "Predatory journals charge **large Article Processing Charges (APCs)** without providing the **peer review and editorial support** that can be expected from a quality scholarly publication." },
        { "ID": 14, "Question": "List two common red flags associated with identifying predatory publishers.", "Answer": "Common red flags include: **using false or misappropriated ISSNs**; **posting fake academics** on the editorial board or using the names of actual academics without their permission; **accepting and publishing articles exceptionally quickly** without peer review or quality control; or **repeatedly contacting and harassing scholars** to submit articles." },
        { "ID": 15, "Question": "Why should scholars read the terms of use carefully before sharing work on scholarly networking sites like ResearchGate or Academia.edu?", "Answer": "Some sites, like ResearchGate and Academia.edu, are run by **for-profit companies**. Sharing your work on these sites **may be a violation of your publication agreement**." }
    ];

    // --- 2. DOM ELEMENTS ---
    const screens = {
        start: document.getElementById('start-screen'),
        game: document.getElementById('game-screen'),
        end: document.getElementById('end-screen')
    };
    
    const buttons = {
        play: document.getElementById('play-btn'),
        replay: document.getElementById('replay-btn'),
        return: document.getElementById('return-btn')
    };

    const flashcard = document.getElementById('flashcard');
    const questionText = document.getElementById('question-text');
    const answerText = document.getElementById('answer-text');
    const progressIndicator = document.getElementById('progress-indicator');

    // --- 3. GAME STATE ---
    let currentQuestions = [];
    let questionIndex = 0;
    let isFlipping = false; // **NEW**: Prevents clicks during animation

    // --- 4. FUNCTIONS ---

    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove('active'));
        screens[screenName].classList.add('active');
    }

    function updateProgress() {
        progressIndicator.textContent = `${questionIndex + 1} / ${currentQuestions.length}`;
    }

    function startGame() {
        currentQuestions = [...flashcardData].sort(() => 0.5 - Math.random()).slice(0, 4);
        questionIndex = 0;
        updateProgress();
        displayCard();
        showScreen('game');
    }

    function displayCard() {
        if (questionIndex < currentQuestions.length) {
            const card = currentQuestions[questionIndex];
            questionText.textContent = card.Question;
            answerText.innerHTML = card.Answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            flashcard.classList.remove('is-flipped');
        }
    }

    // **MODIFIED**: This function now handles the animation timing.
    function handleCardClick() {
        // If the card is already mid-transition, do nothing.
        if (isFlipping) return;

        // If the card is showing the question, flip it to the answer.
        if (!flashcard.classList.contains('is-flipped')) {
            flashcard.classList.add('is-flipped');
        } else {
            // Card is showing the answer, so we proceed to the next question.
            questionIndex++;

            if (questionIndex < currentQuestions.length) {
                isFlipping = true;
                flashcard.style.pointerEvents = 'none'; // Disable clicks during flip

                // 1. Start the flip-back animation.
                flashcard.classList.remove('is-flipped');

                // 2. Wait for the animation to be partway through before changing content.
                setTimeout(() => {
                    updateProgress();
                    displayCard(); // This will now load the NEXT question's content.

                    // 3. Re-enable clicks after the new card is ready.
                    isFlipping = false;
                    flashcard.style.pointerEvents = 'auto';
                }, 100); // 300ms is half of the 0.6s transition time in CSS, for human eyes perception, here uses 100ms
            } else {
                // No more questions, go to the end screen.
                showScreen('end');
            }
        }
    }

    // --- 5. EVENT LISTENERS ---
    buttons.play.addEventListener('click', startGame);
    buttons.replay.addEventListener('click', startGame);
    buttons.return.addEventListener('click', () => showScreen('start'));
    flashcard.addEventListener('click', handleCardClick);
});