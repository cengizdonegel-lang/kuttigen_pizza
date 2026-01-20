import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';

@Component({
    templateUrl: './productlist.component.html',
    styleUrls: ['./product.css']
})
export class ProductListComponent implements AfterViewInit, OnDestroy{

    @ViewChild('carousel') carousel!: Carousel;
    @ViewChild('bgVideo') bgVideo?: ElementRef<HTMLVideoElement>;
    @ViewChild('productMarquee') productMarquee?: ElementRef<HTMLElement>;

    @HostBinding('class.video-playing')
    isVideoPlaying = false;

    private cleanupFns: Array<() => void> = [];

    marqueeHeight = '0px';
    isMarqueeCollapsed = false;

    marqueeVisibleHeight = '0px';
    marqueeOpacity = 1;
    marqueeTransform = 'translate3d(0, 0, 0)';
    marqueeFilter = 'none';
    marqueePointerEvents: 'auto' | 'none' = 'auto';
    marqueeVisibility: 'visible' | 'hidden' = 'visible';

    private marqueeHeightPx = 0;

    private readonly marqueeBehavior = {
        // Keep marquee fully visible close to the top.
        alwaysShowAtTopPx: 8,

        // Start collapsing only after scrolling past this fraction of marquee height.
        startAfterMultiplier: 0.55,

        // Collapse over a wider distance (multiplied by marquee height).
        collapseRangeMultiplier: 1.8,

        // How quickly it should *look* like it disappears after collapsing starts
        // (fraction of marquee height after which opacity becomes ~0).
        fadeWindowMultiplier: 0.25,

        // Visual exit styling while collapsing.
        exitTranslateYPx: 14,
        exitBlurPx: 1.4
    } as const;

    private lastScrollY = 0;


    private intervalId: any;
    ngAfterViewInit() {
        this.intervalId = setInterval(() => {
            if (!this.carousel) return;

            const totalPages =
                Math.ceil(this.products2.length / this.carousel.numScroll);

            if (this.carousel.page < totalPages - 1) {
                this.carousel.page++;
            } else {
                this.carousel.page = 0; // başa dönsün
            }

        }, 1000);

        this.setupBackgroundVideoAutoplay();

        this.setupMarqueeAutoHide();
    }

    private setupMarqueeAutoHide() {
        const marqueeEl = this.productMarquee?.nativeElement;
        if (!marqueeEl) return;

        // In this layout, the scroll container is usually `.layout-content` (not window).
        const scrollEl = (marqueeEl.closest('.layout-content') as HTMLElement | null)
            ?? (document.querySelector('.layout-content') as HTMLElement | null);

        const updateHeight = () => {
            // offsetHeight is stable and includes padding/borders.
            this.marqueeHeightPx = marqueeEl.offsetHeight;
            this.marqueeHeight = `${this.marqueeHeightPx}px`;
        };

        updateHeight();

        // Keep height in sync (responsive / font loading).
        const win = marqueeEl.ownerDocument?.defaultView;
        const ResizeObs: any = win && (win as any).ResizeObserver;
        if (ResizeObs) {
            const ro: ResizeObserver = new ResizeObs(() => updateHeight());
            ro.observe(marqueeEl);
            this.cleanupFns.push(() => ro.disconnect());
        } else {
            const onResize = () => updateHeight();
            window.addEventListener('resize', onResize, { passive: true });
            this.cleanupFns.push(() => window.removeEventListener('resize', onResize));
        }

        const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
        const smoothstep = (t: number) => t * t * (3 - 2 * t);
        const getScrollTop = () => (scrollEl ? scrollEl.scrollTop : (window.scrollY || 0));
        this.lastScrollY = getScrollTop();
        let ticking = false;

        const applyMarqueeByScrollTop = (y: number) => {
            // Don't collapse right at the top.
            const effectiveY = Math.max(0, y - this.marqueeBehavior.alwaysShowAtTopPx);

            // Collapse over a wider distance so cards move more gradually.
            const rangePx = Math.max(1, this.marqueeHeightPx * this.marqueeBehavior.collapseRangeMultiplier);

            // Start collapsing only after the user has scrolled past > half of the marquee height.
            const startPx = this.marqueeHeightPx * this.marqueeBehavior.startAfterMultiplier;
            const progress = clamp01((effectiveY - startPx) / Math.max(1, rangePx - startPx));

            // Ease so it feels more natural and clearly "disappears".
            const eased = smoothstep(progress);

            const visibleHeightPx = Math.max(0, Math.round((1 - eased) * this.marqueeHeightPx));
            this.marqueeVisibleHeight = `${visibleHeightPx}px`;

            // Fade/slide out as it collapses.
            // Make it *visually* disappear shortly after collapse begins,
            // while height continues to collapse gradually with scroll.
            const fadeWindowPx = Math.max(1, this.marqueeHeightPx * this.marqueeBehavior.fadeWindowMultiplier);
            const fadeProgress = clamp01((effectiveY - startPx) / fadeWindowPx);
            const fadeT = smoothstep(fadeProgress);
            this.marqueeOpacity = Math.pow(1 - fadeT, 2.6);

            const ty = -this.marqueeBehavior.exitTranslateYPx * eased;
            this.marqueeTransform = `translate3d(0, ${ty}px, 0)`;
            const blurPx = this.marqueeBehavior.exitBlurPx * fadeT;
            this.marqueeFilter = blurPx > 0.01 ? `blur(${blurPx.toFixed(2)}px)` : 'none';

            const effectivelyHidden = fadeProgress > 0.98;
            this.marqueePointerEvents = effectivelyHidden ? 'none' : 'auto';
            this.marqueeVisibility = effectivelyHidden ? 'hidden' : 'visible';

            // Used for the centering mode when marquee is effectively gone.
            this.isMarqueeCollapsed = progress >= 0.999;
        };

        // Initialize once we have a height.
        applyMarqueeByScrollTop(this.lastScrollY);

        const onScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                ticking = false;

                const y = getScrollTop();
                this.lastScrollY = y;

                applyMarqueeByScrollTop(y);
            });
        };

        const target: any = scrollEl ?? window;
        target.addEventListener('scroll', onScroll, { passive: true });
        this.cleanupFns.push(() => target.removeEventListener('scroll', onScroll));
    }

    private setupBackgroundVideoAutoplay() {
        const video = this.bgVideo?.nativeElement;
        if (!video) return;

        const setPlaying = (playing: boolean) => {
            this.isVideoPlaying = playing;
        };

        const onPlaying = () => setPlaying(true);
        const onPause = () => setPlaying(false);
        const onEnded = () => setPlaying(false);
        const onError = () => setPlaying(false);

        video.addEventListener('playing', onPlaying);
        video.addEventListener('pause', onPause);
        video.addEventListener('ended', onEnded);
        video.addEventListener('error', onError);

        this.cleanupFns.push(() => {
            video.removeEventListener('playing', onPlaying);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('ended', onEnded);
            video.removeEventListener('error', onError);
        });

        const tryPlay = () => {
            try {
                video.muted = true;
                video.playsInline = true;
                (video as any).webkitPlaysInline = true;
            } catch {
                // ignore
            }

            const playPromise = video.play();
            if (playPromise && typeof (playPromise as any).catch === 'function') {
                (playPromise as Promise<void>).catch(() => {
                    // iOS/Safari may block autoplay until user interaction
                });
            }
        };

        // Attempt immediately (some browsers allow muted autoplay)
        queueMicrotask(tryPlay);

        // Fallback: start playback on first user interaction
        const unlock = () => tryPlay();
        window.addEventListener('touchstart', unlock, { once: true, passive: true });
        window.addEventListener('click', unlock, { once: true, passive: true });

        this.cleanupFns.push(() => {
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('click', unlock);
        });
    }

    unlockBackgroundVideo() {
        const video = this.bgVideo?.nativeElement;
        if (!video) return;
        try {
            video.muted = true;
            video.playsInline = true;
            (video as any).webkitPlaysInline = true;
        } catch {
            // ignore
        }

        const playPromise = video.play();
        if (playPromise && typeof (playPromise as any).catch === 'function') {
            (playPromise as Promise<void>).catch(() => {
                // ignore
            });
        }
    }
    ngOnDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        for (const fn of this.cleanupFns) {
            try {
                fn();
            } catch {
                // ignore
            }
        }
    }
    color1: string = 'Bluegray';
    hoveredItem: number | null = null;

    products =  [
        {
            price: '$140.00',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-1.png'
        },
        {
            price: '$82.00',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-2.png'
        },
        {
            price: '$54.00',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-3.png'
        },
        {
            price: '$72.00',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-3.png'
        },
        {
            price: '$99.00',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-5.png'
        },
        {
            price: '$89.00',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-4-6.png'
        }
    ];

    products2 =  [
        {
            color: 'Bluegray',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-1.png'        },
        {
            color: 'Indigo',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-2.png'        },
        {
            color: 'Purple',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-3.png'        },
        {
            color: 'Cyan',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-4.png'        },
        {
            color: 'Margarita',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-5.png'        },
        {
            color: 'Salami',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-6.png'        },
        {
            color: 'Purple',
            image: 'assets/charisma/images/ecommerce/product-list/product-list-3-1.png'        },
        {
            color: 'Porculutti',
            image:'assets/charisma/images/ecommerce/product-list/product-list-3-4.png'
        },
        {
            color: 'Bluegray',
            image:'assets/charisma/images/ecommerce/product-list/product-list-3-1.png'
        },
        {
            color: 'Indigo',
            image:'assets/charisma/images/ecommerce/product-list/product-list-3-2.png'
        },
        {
            color: 'Purple',
            image:'assets/charisma/images/ecommerce/product-list/product-list-3-3.png'
        },
        {
            color: 'Cyan',
            image:'assets/charisma/images/ecommerce/product-list/product-list-3-4.png'
        },
    ];
    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];


}
