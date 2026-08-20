document.addEventListener("DOMContentLoaded", () => {

    const yearEl = document.getElementById("year");

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Menú móvil
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");

    if (burger && nav) {

        burger.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("is-open");

            burger.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        nav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("is-open");

                burger.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }

    // Sombra del header
    const header = document.getElementById("header");

    const onScrollHeader = () => {

        if (!header) return;

        header.style.boxShadow =
            window.scrollY > 10
                ? "0 10px 30px -20px rgba(0,0,48,0.6)"
                : "none";
    };

    window.addEventListener(
        "scroll",
        onScrollHeader,
        { passive: true }
    );

    onScrollHeader();

    // Ruta académica
    const routeDetails = [
        "Primaria: afianzamos lectoescritura, cálculo y los primeros hábitos de estudio, en clases cercanas y con mucha paciencia.",
        "ESO: repaso por asignaturas, recuperación de pendientes y preparación de exámenes trimestrales.",
        "Bachillerato: itinerarios de Ciencias, Humanidades y Sociales, con la vista puesta en la EBAU.",
        "Ciclos Formativos: apoyo en módulos de Grado Medio y Superior para no perder el ritmo del curso.",
        "Universidad y adultos: preparación de pruebas de acceso y del título de Graduado en ESO para mayores de 18 años."
    ];

    const routeStops =
        document.querySelectorAll(".route__stop");

    const routeDetail =
        document.getElementById("routeDetail");

    const setActiveStop = (index) => {

        routeStops.forEach((stop, i) => {

            stop.classList.toggle(
                "is-active",
                i === index
            );
        });

        if (routeDetail) {

            routeDetail.style.opacity = "0";

            window.setTimeout(() => {

                routeDetail.textContent =
                    routeDetails[index];

                routeDetail.style.opacity = "1";

            }, 120);
        }
    };

    routeStops.forEach((stop, i) => {

        stop.addEventListener(
            "click",
            () => setActiveStop(i)
        );

        stop.addEventListener(
            "mouseenter",
            () => setActiveStop(i)
        );
    });

    if (routeStops.length) {
        setActiveStop(0);
    }

    // Modal
    const modal =
        document.getElementById("trialModal");

    const openers = [
        document.getElementById("openTrialBtn"),
        document.getElementById("openTrialBtn2"),
        document.getElementById("openTrialBtn3")
    ].filter(Boolean);

    const closers =
        modal
            ? modal.querySelectorAll("[data-close]")
            : [];

    const openModal = () => {

        if (!modal) return;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        const firstField =
            modal.querySelector("input, select");

        if (firstField) {
            firstField.focus();
        }
    };

    const closeModal = () => {

        if (!modal) return;

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    };

    openers.forEach((btn) => {
        btn.addEventListener("click", openModal);
    });

    closers.forEach((el) => {
        el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (e) => {

        if (
            e.key === "Escape" &&
            modal &&
            modal.classList.contains("is-open")
        ) {
            closeModal();
        }
    });

    // Formulario WhatsApp
    const trialForm =
        document.getElementById("trialForm");

    if (trialForm) {

        trialForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const data =
                new FormData(trialForm);

            const nombre =
                (data.get("nombre") || "")
                    .toString()
                    .trim();

            const nivel =
                (data.get("nivel") || "")
                    .toString()
                    .trim();

            const telefono =
                (data.get("telefono") || "")
                    .toString()
                    .trim();

            const mensaje =
                `Hola eduKaEVA, soy ${nombre}. ` +
                `Me gustaría reservar una clase de prueba gratis de ${nivel}. ` +
                `Mi teléfono de contacto es ${telefono}.`;

            const whatsappUrl =
                `https://wa.me/34634095394?text=${encodeURIComponent(mensaje)}`;

            window.open(
                whatsappUrl,
                "_blank",
                "noopener"
            );

            trialForm.reset();

            closeModal();
        });
    }

    // Animaciones al hacer scroll
    const revealTargets =
        document.querySelectorAll(
            ".level-card, .method-card, .gallery__item, .trust__item, .contact-list li"
        );

    revealTargets.forEach((el) => {
        el.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.15
                }
            );

        revealTargets.forEach((el) => {
            observer.observe(el);
        });

    } else {

        revealTargets.forEach((el) => {
            el.classList.add("is-visible");
        });
    }

});