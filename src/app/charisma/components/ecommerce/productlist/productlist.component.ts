import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, ViewChild } from '@angular/core';
import { Carousel } from 'primeng/carousel';

@Component({
    templateUrl: './productlist.component.html',
    styleUrls: ['./product.css']
})
export class ProductListComponent implements AfterViewInit, OnDestroy{

    @ViewChild('carousel') carousel!: Carousel;
    @ViewChild('bgVideo') bgVideo?: ElementRef<HTMLVideoElement>;

    @HostBinding('class.video-playing')
    isVideoPlaying = false;

    private cleanupFns: Array<() => void> = [];


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
