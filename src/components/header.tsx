'use client'; // Needed for useState and Framer Motion

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming utils exists for cn function
import Image from 'next/image';
import Link from 'next/link';
import type { LinkProps } from 'next/link';

// Add detection helpers for cross-browser compatibility
const browserInfo = {
	isIE: typeof window !== 'undefined' && (
		navigator.userAgent.indexOf('MSIE') !== -1 || 
		navigator.userAgent.indexOf('Trident') !== -1
	),
	isSafari: typeof window !== 'undefined' && (
		navigator.userAgent.indexOf('Safari') !== -1 && 
		navigator.userAgent.indexOf('Chrome') === -1
	),
	isFirefox: typeof window !== 'undefined' && 
		navigator.userAgent.indexOf('Firefox') !== -1,
	isEdge: typeof window !== 'undefined' && 
		navigator.userAgent.indexOf('Edg') !== -1,
};

interface HeaderProps {
	defaultLogo?: boolean;
}

// Custom hook for responsive breakpoint detection
function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);
	
	useEffect(() => {
		const media = window.matchMedia(query);
		// Update the state initially
		setMatches(media.matches);
		
		// Define callback for media query change
		const listener = (e: MediaQueryListEvent) => {
			setMatches(e.matches);
		};
		
		// Add the callback as a listener
		media.addEventListener('change', listener);
		
		// Remove the listener when component unmounts
		return () => {
			media.removeEventListener('change', listener);
		};
	}, [query]);
	
	return matches;
}

function Header({ defaultLogo = false }: HeaderProps) {
	// Responsive breakpoints
	const isMobile = useMediaQuery('(max-width: 639px)');
	const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
	const isDesktop = useMediaQuery('(min-width: 1024px)');
	
	// State management
	const [isOpen, setIsOpen] = useState(false);
	const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
	const [isTouchDevice, setIsTouchDevice] = useState(false);
	const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
	const [shouldShowSocialMenu, setShouldShowSocialMenu] = useState(true);
	const [isScrollingDown, setIsScrollingDown] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeMenuIndex, setActiveMenuIndex] = useState(-1); // For keyboard navigation
	
	// Refs
	const socialButtonRef = useRef<HTMLButtonElement>(null);
	const socialMenuRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	
	// Create refs for social and menu links - refactored approach to fix TypeScript issues
	const socialLinksRef = useRef<HTMLAnchorElement[]>([]);
	const menuLinksRef = useRef<HTMLAnchorElement[]>([]);
	
	// Function to set social link ref
	const setSocialLinkRef = (el: HTMLAnchorElement | null, index: number) => {
		if (el) {
			socialLinksRef.current[index] = el;
		}
	};
	
	// Function to set menu link ref
	const setMenuLinkRef = (el: HTMLAnchorElement | null, index: number) => {
		if (el) {
			menuLinksRef.current[index] = el;
		}
	};

	// Function to toggle the main menu with proper state coordination
	const toggleMenu = () => {
		// If opening the main menu, close the social menu first
		if (!isOpen) {
			setIsSocialMenuOpen(false);
		}
		setIsOpen(!isOpen);
	};

	// Function to toggle the social menu on touch devices with proper state coordination
	const toggleSocialMenu = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent event bubbling
		
		// Only allow toggling when main menu is closed
		if (!isOpen) {
			// Always allow toggling the social menu on explicit click, regardless of scroll position
			setIsSocialMenuOpen(!isSocialMenuOpen);
			
			// Reset active index when opening social menu
			if (!isSocialMenuOpen) {
				setActiveMenuIndex(-1);
			}
		}
	};

	// State for tracking menu close timeout
	const [menuCloseTimeout, setMenuCloseTimeout] = useState<NodeJS.Timeout | null>(null);

	// Function to handle social menu hover (for non-touch devices)
	const handleSocialHover = () => {
		// Only show social menu on hover when:
		// 1. Main menu is closed
		// 2. On non-touch devices
		if (!isOpen && !isTouchDevice) {
			// Clear any pending close timeout
			if (menuCloseTimeout) {
				clearTimeout(menuCloseTimeout);
				setMenuCloseTimeout(null);
			}
			setIsSocialMenuOpen(true);
		}
	};

	// Function to handle mouse leave
	const handleSocialLeave = () => {
		if (!isTouchDevice) {
			// Set a timeout to close the menu after a short delay
			const timeout = setTimeout(() => {
				setIsSocialMenuOpen(false);
			}, 300); // 300ms delay gives user time to move to the menu
			
			setMenuCloseTimeout(timeout);
		}
	};

	// Clean up timeout when component unmounts
	useEffect(() => {
		return () => {
			if (menuCloseTimeout) {
				clearTimeout(menuCloseTimeout);
			}
		};
	}, [menuCloseTimeout]);

	// Cross-browser detection for passive event support - memoized
	const supportsPassiveEvents = useRef(() => {
		let passiveSupported = false;
		
		try {
			// Test via a getter in the options object to see if the passive property is accessed
			const opts = Object.defineProperty({}, 'passive', {
				get: () => {
					passiveSupported = true;
					return true;
				}
			});
			
			window.addEventListener('testpassive', null as any, opts);
			window.removeEventListener('testpassive', null as any, opts);
		} catch (e) {
			// Do nothing - passive not supported
		}
		
		return passiveSupported;
	}).current;

	// State management
	const [browserCompatMode, setBrowserCompatMode] = useState<string>('modern');
	const [supportsPassive, setSupportsPassive] = useState(false);

	// Effect for browser detection and compatibility mode
	useEffect(() => {
		// Passive events detection
		setSupportsPassive(supportsPassiveEvents());
		
		// Set browser-specific compatibility mode
		if (browserInfo.isIE) {
			setBrowserCompatMode('legacy');
		} else if (browserInfo.isSafari) {
			setBrowserCompatMode('safari');
		} else if (browserInfo.isEdge) {
			setBrowserCompatMode('edge');
		} else if (browserInfo.isFirefox) {
			setBrowserCompatMode('firefox');
		} else {
			setBrowserCompatMode('modern');
		}
		
		// Apply browser-specific CSS fixes
		if (browserInfo.isIE) {
			// Add IE-specific styles
			document.documentElement.classList.add('is-ie');
		}
		
		if (browserInfo.isSafari) {
			// Add Safari-specific styles
			document.documentElement.classList.add('is-safari');
		}
	}, [supportsPassiveEvents]);

	// Detect touch device on component mount with enhanced detection for different browsers
	useEffect(() => {
		const detectTouch = () => {
			// Enhanced touch detection that works across browsers
			const isTouchCapable = 
				'ontouchstart' in window || 
				navigator.maxTouchPoints > 0 || 
				(navigator as any).msMaxTouchPoints > 0 ||
				(window as any).DocumentTouch && document instanceof (window as any).DocumentTouch;
				
			setIsTouchDevice(isTouchCapable);
		};
		
		// Run once on mount
		detectTouch();
		
		// Use passive events when supported for better scroll performance
		const eventOptions = supportsPassive ? { passive: true } : false;
		
		// Also listen for resize events as device orientation might change capabilities
		window.addEventListener('resize', detectTouch, eventOptions);
		
		return () => {
			window.removeEventListener('resize', detectTouch, eventOptions as any);
		};
	}, [supportsPassive]);

	// Handle document-wide clicks for touch devices to close menus when clicking outside
	// with browser compatibility improvements
	useEffect(() => {
		if (!isTouchDevice) return;
		
		const handleClickOutside = (e: MouseEvent | TouchEvent) => {
			const target = e.target as Node;
			if (
				isSocialMenuOpen && 
				socialMenuRef.current && 
				socialButtonRef.current &&
				!socialMenuRef.current.contains(target) && 
				!socialButtonRef.current.contains(target)
			) {
				setIsSocialMenuOpen(false);
			}
		};
		
		// For older browsers that might not support all event types
		document.addEventListener('click', handleClickOutside as EventListener);
		document.addEventListener('touchend', handleClickOutside as EventListener);
		
		return () => {
			document.removeEventListener('click', handleClickOutside as EventListener);
			document.removeEventListener('touchend', handleClickOutside as EventListener);
		};
	}, [isSocialMenuOpen, isTouchDevice]);

	// Automatically close social menu when main menu opens
	useEffect(() => {
		if (isOpen && isSocialMenuOpen) {
			setIsSocialMenuOpen(false);
		}
	}, [isOpen, isSocialMenuOpen]);

	// Handle scroll behavior to hide/show social menu with cross-browser improvements
	useEffect(() => {
		if (isTouchDevice) return; // Skip for touch devices
		
		// Use requestAnimationFrame for better performance
		// With fallback for older browsers
		const requestAnim = window.requestAnimationFrame || 
							((callback) => window.setTimeout(callback, 1000 / 60));
		
		const handleScroll = () => {
			const currentScrollPosition = window.pageYOffset !== undefined ? 
				window.pageYOffset : 
				(document.documentElement || document.body.parentNode || document.body).scrollTop;
			
			// Determine scroll direction
			const isScrollingDownNow = currentScrollPosition > previousScrollPosition;
			setIsScrollingDown(isScrollingDownNow);
			
			// Set scrolled state if we've scrolled more than 50px
			setIsScrolled(currentScrollPosition > 50);
			
			// Update state based on scroll direction
			// Hide menu when scrolling down more than 10px from the previous position
			// Show menu when scrolling up
			if (isScrollingDownNow && currentScrollPosition > 50 && 
				(currentScrollPosition - previousScrollPosition) > 10) {
				setShouldShowSocialMenu(false);
				// Also close the social menu if it's open
				if (isSocialMenuOpen) {
					setIsSocialMenuOpen(false);
				}
			} else if (!isScrollingDownNow) {
				setShouldShowSocialMenu(true);
			}
			
			// Update previous position for next comparison
			setPreviousScrollPosition(currentScrollPosition);
		};
		
		// Throttle scroll events for better performance with legacy browser support
		let ticking = false;
		const scrollListener = () => {
			if (!ticking) {
				requestAnim(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		};
		
		// Use passive event listeners when supported
		const scrollOptions = supportsPassive ? { passive: true } : false;
		window.addEventListener('scroll', scrollListener, scrollOptions as any);
		
		return () => {
			window.removeEventListener('scroll', scrollListener, scrollOptions as any);
		};
	}, [previousScrollPosition, isTouchDevice, isSocialMenuOpen, supportsPassive]);

	// Variants for the hamburger lines animation - 300ms duration as per brief
	const topVariants = {
		closed: { rotate: 0, translateY: 0 },
		open: { rotate: 45, translateY: 7 },
	};

	const bottomVariants = {
		closed: { rotate: 0, translateY: 0 },
		open: { rotate: -45, translateY: -7 },
	};

	// Overlay variants - 400ms duration as per brief
	const overlayVariants = {
		hidden: { 
			opacity: 0,
			transition: {
				duration: 0.4,
				ease: 'easeInOut'
			}
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.4,
				ease: 'easeInOut',
			},
		},
	};

	// Menu container variants with staggered children - total sequence under 1000ms as per brief
	const menuContainerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15, // Increased delay between items
				delayChildren: 0.2, // Start after overlay animation
			},
		},
	};

	// Individual menu item variants with subtle upward motion
	const menuItemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.215, 0.61, 0.355, 1], // Custom easing for more elegant motion
			},
		},
	};

	const navLinks = [
		{ id: '01', name: 'STUDIO', href: '/studio' },
		{ id: '02', name: 'PROJECTS', href: '/projects' },
		{ id: '03', name: 'PRESS', href: '/press' },
		{ id: '04', name: 'WATCH', href: '/watch' },
		{ id: '05', name: 'CONTACT', href: '/contact' },
	];

	// Social menu dropdown animation variants
	const socialMenuVariants = {
		hidden: { 
			opacity: 0,
			y: 5,
			transition: {
				duration: 0.4,
				ease: 'easeInOut'
			}
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: 'easeInOut',
				staggerChildren: 0.15,
				delayChildren: 0.05
			},
		},
	};

	// Social menu items variants
	const socialItemVariants = {
		hidden: { opacity: 0, y: 8 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: [0.25, 0.1, 0.25, 1], // Custom easing for elegant motion
			},
		},
	};

	const socialLinks = [
		{ id: 'instagram', name: 'INSTAGRAM', href: 'https://instagram.com' },
		{ id: 'facebook', name: 'FACEBOOK', href: 'https://facebook.com' },
		{ id: 'tiktok', name: 'TIKTOK', href: 'https://tiktok.com' },
	];

	// Determine the header background class based on state
	const getHeaderBackgroundClass = () => {
		if (isOpen) {
			// Always solid black when menu is open
			return 'bg-black text-white';
		}
		
		// Always transparent when collapsed (regardless of scroll)
		return 'bg-transparent text-black';
	};

	// Helper function to get header height class based on screen size
	const getHeaderHeightClass = () => {
		if (isMobile) return 'h-[115px]'; // Explicit 115px height for mobile
		if (isTablet) return 'h-[140px]'; // Intermediate height for tablet
		return 'h-[170px]'; // Explicit 170px height for desktop
	};

	// Determine social menu width based on screen size
	const getSocialMenuWidth = () => {
		if (isMobile) return 'min-w-[180px] max-w-[95vw]';
		if (isTablet) return 'min-w-[220px]';
		return 'min-w-[240px]';
	};

	// Determine header padding based on screen size
	const getHeaderPadding = () => {
		if (isMobile) return 'px-4 py-0'; // Remove vertical padding on mobile as we're using fixed height
		if (isTablet) return 'px-5 py-0'; // Remove vertical padding on tablet as we're using fixed height
		return 'px-6 py-0'; // Remove vertical padding on desktop as we're using fixed height
	};
	
	// Determine logo size based on screen size
	const getLogoSize = () => {
		if (isMobile) return { width: 75, height: 75 }; // Adjusted for 115px header
		if (isTablet) return { width: 90, height: 90 };
		return { width: 110, height: 110 }; // Larger logo for desktop
	};

	// Logo dimensions
	const logoSize = getLogoSize();

	// Handle keydown events for menu navigation
	const handleSocialMenuKeyDown = (e: React.KeyboardEvent) => {
		if (!isSocialMenuOpen) return;
		
		const links = socialLinks;
		const lastIndex = links.length - 1;
		
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				setActiveMenuIndex(prev => (prev < lastIndex ? prev + 1 : 0));
				break;
			case 'ArrowUp':
				e.preventDefault();
				setActiveMenuIndex(prev => (prev > 0 ? prev - 1 : lastIndex));
				break;
			case 'Home':
				e.preventDefault();
				setActiveMenuIndex(0);
				break;
			case 'End':
				e.preventDefault();
				setActiveMenuIndex(lastIndex);
				break;
			case 'Escape':
				e.preventDefault();
				setIsSocialMenuOpen(false);
				socialButtonRef.current?.focus();
				break;
			case 'Tab':
				// Allow natural tabbing but close menu if tabbing outside
				if (activeMenuIndex === lastIndex && !e.shiftKey) {
					setIsSocialMenuOpen(false);
				} else if (activeMenuIndex === 0 && e.shiftKey) {
					setIsSocialMenuOpen(false);
				}
				break;
		}
	};
	
	// Handle keydown for main menu
	const handleMainMenuKeyDown = (e: React.KeyboardEvent) => {
		if (!isOpen) return;
		
		const links = navLinks;
		const lastIndex = links.length - 1;
		
		switch (e.key) {
			case 'ArrowDown': {
				e.preventDefault();
				setActiveMenuIndex(prev => (prev < lastIndex ? prev + 1 : 0));
				break;
			}
			case 'ArrowUp': {
				e.preventDefault();
				setActiveMenuIndex(prev => (prev > 0 ? prev - 1 : lastIndex));
				break;
			}
			case 'Home': {
				e.preventDefault();
				setActiveMenuIndex(0);
				break;
			}
			case 'End': {
				e.preventDefault();
				setActiveMenuIndex(lastIndex);
				break;
			}
			case 'Escape': {
				e.preventDefault();
				setIsOpen(false);
				const menuButton = document.querySelector('[aria-label="Open menu"]') as HTMLButtonElement;
				menuButton?.focus();
				break;
			}
		}
	};
	
	// Effect to manage focus when active index changes in social menu
	useEffect(() => {
		if (isSocialMenuOpen && activeMenuIndex >= 0) {
			socialLinksRef.current[activeMenuIndex]?.focus();
		}
	}, [activeMenuIndex, isSocialMenuOpen]);
	
	// Effect to manage focus when active index changes in main menu
	useEffect(() => {
		if (isOpen && activeMenuIndex >= 0) {
			menuLinksRef.current[activeMenuIndex]?.focus();
		}
	}, [activeMenuIndex, isOpen]);

	// Reset active menu index when menus close
	useEffect(() => {
		if (!isOpen && !isSocialMenuOpen) {
			setActiveMenuIndex(-1);
		}
	}, [isOpen, isSocialMenuOpen]);
	
	// Trap focus within social menu
	useEffect(() => {
		if (!isSocialMenuOpen) return;
		
		const handleTabKey = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;
			
			const socialMenuElement = socialMenuRef.current;
			if (!socialMenuElement) return;
			
			const focusableElements = socialMenuElement.querySelectorAll(
				'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
			);
			
			if (focusableElements.length === 0) return;
			
			const firstElement = focusableElements[0] as HTMLElement;
			const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
			
			if (e.shiftKey && document.activeElement === firstElement) {
				e.preventDefault();
				lastElement.focus();
			} else if (!e.shiftKey && document.activeElement === lastElement) {
				e.preventDefault();
				firstElement.focus();
			}
		};
		
		document.addEventListener('keydown', handleTabKey);
		return () => {
			document.removeEventListener('keydown', handleTabKey);
		};
	}, [isSocialMenuOpen]);

	// Trap focus within main menu
	useEffect(() => {
		if (!isOpen) return;
		
		// Focus first element when menu opens
		const menuLinks = menuLinksRef.current.filter(Boolean);
		if (menuLinks.length > 0 && activeMenuIndex === -1) {
			setActiveMenuIndex(0);
		}
		
		const handleTabKey = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;
			
			const menuDialog = document.querySelector('[aria-modal="true"]');
			if (!menuDialog) return;
			
			const focusableElements = menuDialog.querySelectorAll(
				'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
			);
			
			if (focusableElements.length === 0) return;
			
			const firstElement = focusableElements[0] as HTMLElement;
			const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
			
			if (e.shiftKey && document.activeElement === firstElement) {
				e.preventDefault();
				lastElement.focus();
			} else if (!e.shiftKey && document.activeElement === lastElement) {
				e.preventDefault();
				firstElement.focus();
			}
		};
		
		document.addEventListener('keydown', handleTabKey);
		
		// Disable scrolling when menu is open
		document.body.style.overflow = 'hidden';
		
		return () => {
			document.removeEventListener('keydown', handleTabKey);
			document.body.style.overflow = '';
		};
	}, [isOpen, activeMenuIndex]);

	// Function to handle touch event on Safari
	const handleSafariTouch = (e: React.TouchEvent) => {
		if (browserInfo.isSafari) {
			e.preventDefault();
			toggleSocialMenu(e as unknown as React.MouseEvent);
		}
	};

	// Apply browser-specific styles to ensure consistent appearance
	const getBrowserStyleFixes = () => {
		let styles = {};
		
		if (browserInfo.isIE) {
			// IE-specific fixes
			styles = {
				...styles,
				msFlexAlign: 'center',
				msTransform: 'translateY(-50%)',
			};
		}
		
		if (browserInfo.isSafari) {
			// Safari-specific fixes for animations
			styles = {
				...styles,
				WebkitBackfaceVisibility: 'hidden',
			};
		}
		
		return styles;
	};

	// Enhanced focus ring polyfill for cross-browser support
	const getFocusRingClasses = (isActive: boolean) => {
		// Use focus-visible when available, with fallback for older browsers
		return browserCompatMode === 'legacy' ? 
			`${isActive ? 'focus:ring-2 focus:ring-offset-2 focus:ring-black' : ''}` :
			'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black';
	};

	// Use useEffect to add event listeners for hover state management (non-touch devices)
	useEffect(() => {
		if (isTouchDevice) return; // Skip for touch devices

		const socialButton = socialButtonRef.current;
		const socialMenu = socialMenuRef.current;

		if (socialButton && socialMenu) {
			// Create a function to check if mouse is over button or menu
			const isMouseInSocialArea = (e: MouseEvent) => {
				const rect1 = socialButton.getBoundingClientRect();
				const rect2 = socialMenu.getBoundingClientRect();
				
				// Check if pointer is inside either element's bounds
				return (
					(e.clientX >= rect1.left && e.clientX <= rect1.right && 
					e.clientY >= rect1.top && e.clientY <= rect1.bottom) ||
					(isSocialMenuOpen && e.clientX >= rect2.left && e.clientX <= rect2.right && 
					e.clientY >= rect2.top && e.clientY <= rect2.bottom)
				);
			};

			// Handle document-wide mousemove
			const handleMouseMove = (e: MouseEvent) => {
				// Only manage hover state when:
				// 1. Main menu is closed
				// 2. Social menu is allowed to be shown (based on scroll)
				if (!isOpen && shouldShowSocialMenu) {
					const isInArea = isMouseInSocialArea(e);
					
					if (isInArea) {
						// Mouse is in the area - open menu and clear any close timeout
						if (menuCloseTimeout) {
							clearTimeout(menuCloseTimeout);
							setMenuCloseTimeout(null);
						}
						setIsSocialMenuOpen(true);
					}
					// We don't close immediately here - leave that to the timeout from onMouseLeave
				}
			};

			// Add listeners
			document.addEventListener('mousemove', handleMouseMove);

			// Cleanup listeners
			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
			};
		}
	}, [isTouchDevice, isOpen, shouldShowSocialMenu, isSocialMenuOpen, menuCloseTimeout]);

	return (
		<header 
			ref={headerRef}
			className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 mt-2', 
				getHeaderBackgroundClass(), getHeaderHeightClass()
			)}
			style={{
				// Add vendor prefixes for older browsers
				WebkitTransition: 'all 0.3s',
				MozTransition: 'all 0.3s',
				msTransition: 'all 0.3s',
				...getBrowserStyleFixes()
			}}
		>
			{/* Main content */}
			<div className={cn("mx-auto flex items-center justify-between relative h-full", getHeaderPadding())}>
				{/* Hamburger Button with Menu Text */}
				<div className="flex items-center gap-2 sm:gap-4 z-50">
					<button
						onClick={toggleMenu}
						type="button"
						className={`relative w-10 h-10 sm:w-11 sm:h-11 flex flex-col justify-center items-center ${getFocusRingClasses(true)} rounded-sm`}
						aria-label={isOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={isOpen}
						aria-controls="main-menu"
						style={getBrowserStyleFixes()}
					>
						{/* Top line - transforms to one half of X */}
						<span className={`block transition-all duration-300 ease-out 
							h-0.5 w-5 sm:w-6 rounded-sm ${isOpen ? 
							'rotate-45 translate-y-[0.175rem] bg-white' : 'bg-black -translate-y-[0.175rem]'
							}`}
						>
						</span>
						{/* Bottom line - transforms to other half of X */}
						<span className={`block transition-all duration-300 ease-out 
							h-0.5 w-5 sm:w-6 rounded-sm ${isOpen ? 
							'-rotate-45 -translate-y-[0.175rem] bg-white' : 'bg-black translate-y-[0.175rem]'
							}`}
						>
						</span>
					</button>
					<button
						onClick={toggleMenu}
						type="button"
						className={`font-heading font-light text-xs sm:text-sm tracking-wider hover:[font-style:italic] ${getFocusRingClasses(false)} rounded-sm ${
							isOpen ? 'text-white focus-visible:ring-white' : 'text-black'
						}`}
						aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
						aria-controls="main-menu"
						aria-expanded={isOpen}
						style={{
							WebkitTransition: 'color 0.3s ease',
							MozTransition: 'color 0.3s ease',
							msTransition: 'color 0.3s ease',
						}}
					>
						{isOpen ? 'CLOSE' : 'MENU'}
					</button>
				</div>

				{/* Centered Logo */}
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-4 sm:py-5 md:py-6"
					style={{
						WebkitTransform: 'translate(-50%, -50%)',
						MozTransform: 'translate(-50%, -50%)',
						msTransform: 'translate(-50%, -50%)',
					}}
				>
					<Link 
						href="/"
						className={`${getFocusRingClasses(true)} rounded-sm inline-block`}
						aria-label="Home page"
					>
						<Image
							src={`/logos/${isOpen ? 'white' : isScrolled && !defaultLogo ? 'black' : defaultLogo ? 'white' : 'black'}-logo.svg`}
							alt="Logo"
							width={logoSize.width}
							height={logoSize.height}
							priority
						/>
					</Link>
				</div>

				{/* Social Button and Menu Container */}
				<div 
					className={`flex items-center gap-2 sm:gap-4 z-50 relative ${isOpen ? 'hidden' : ''}`}
					onMouseEnter={isTouchDevice ? undefined : handleSocialHover}
					onMouseLeave={isTouchDevice ? undefined : handleSocialLeave}
					onKeyDown={handleSocialMenuKeyDown}
				>
					{/* Social Button */}
					<button
						type="button"
						className={`flex items-center font-heading font-light text-xs sm:text-sm cursor-pointer mr-3 sm:mr-6 p-2 hover:[font-style:italic] tracking-wider min-h-[44px] min-w-[44px] justify-center ${getFocusRingClasses(true)} rounded-sm`}
						aria-expanded={isSocialMenuOpen}
						aria-haspopup="true"
						aria-controls="social-menu"
						id="social-menu-button"
						ref={socialButtonRef}
						onClick={toggleSocialMenu}
						onTouchEnd={browserInfo.isSafari ? handleSafariTouch : undefined}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								toggleSocialMenu(e as unknown as React.MouseEvent);
							} else if (e.key === 'ArrowDown' && !isSocialMenuOpen) {
								e.preventDefault();
								setIsSocialMenuOpen(true);
								setActiveMenuIndex(0);
							}
						}}
						style={{
							WebkitTransition: 'all 0s', // Make instant - no transition
							MozTransition: 'all 0s',
							msTransition: 'all 0s',
							...getBrowserStyleFixes()
						}}
					>
						<span className="hidden sm:inline">SOCIAL</span>
						<span className="sm:hidden">SOC</span>
					</button>

					{/* Mobile Touch Overlay - Only visible when menu is open on touch devices */}
					{isTouchDevice && isSocialMenuOpen && (
						<button
							type="button"
							className="fixed inset-0 bg-black bg-opacity-5 z-40 cursor-default"
							onClick={() => setIsSocialMenuOpen(false)}
							onTouchEnd={() => setIsSocialMenuOpen(false)} // Add explicit touch support
							onKeyDown={(e) => {
								if (e.key === 'Escape') {
									setIsSocialMenuOpen(false);
									socialButtonRef.current?.focus();
								}
							}}
							aria-label="Close menu"
							tabIndex={-1}
							style={{ // IE fallback for rgba
								backgroundColor: browserInfo.isIE ? 'black' : undefined,
								opacity: browserInfo.isIE ? 0.05 : undefined,
							}}
						/>
					)}

					{/* Social Menu Dropdown */}
					<AnimatePresence>
						{isSocialMenuOpen && !isOpen && (
							<motion.div
								className={cn("absolute top-full right-0 mt-2 bg-white shadow-lg rounded-sm overflow-hidden z-50 border border-gray-100", getSocialMenuWidth())}
								variants={socialMenuVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
								role="menu"
								id="social-menu"
								aria-orientation="vertical"
								aria-labelledby="social-menu-button"
								ref={socialMenuRef}
								style={{
									// Cross-browser shadow support
									WebkitBoxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
									MozBoxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
									boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
									// IE11 fallback for border color
									borderColor: browserInfo.isIE ? '#f3f4f6' : undefined,
								}}
							>
								<div className="py-1">
									{socialLinks.map((link, index) => (
										<motion.div
											key={link.id}
											className={`px-1 ${index !== socialLinks.length - 1 ? 'border-b border-gray-100' : ''}`}
											variants={socialItemVariants}
											style={{
												// IE11 fallback for border color
												borderBottomColor: browserInfo.isIE && index !== socialLinks.length - 1 ? '#f3f4f6' : undefined,
											}}
										>
											<Link
												href={link.href}
												className={`flex items-center px-3 sm:px-4 py-3 sm:py-4 font-heading text-xs sm:text-sm tracking-wider text-gray-800 hover:bg-gray-50 hover:[font-style:italic] hover:text-black hover:scale-[1.02] rounded-sm w-full text-left min-h-[44px] ${getFocusRingClasses(true)}`}
												target="_blank"
												rel="noopener noreferrer"
												onClick={() => setIsSocialMenuOpen(false)}
												aria-label={`Visit our ${link.name.toLowerCase()} page (opens in new tab)`}
												role="menuitem"
												tabIndex={isSocialMenuOpen ? 0 : -1}
												ref={el => setSocialLinkRef(el, index)}
												style={{
													WebkitTransition: 'all 0s ease', // Make instant
													MozTransition: 'all 0s ease',
													msTransition: 'all 0s ease',
													WebkitTransform: 'scale(1)',
													MozTransform: 'scale(1)',
													msTransform: 'scale(1)',
													// Add hover effect manually for IE
													...(browserInfo.isIE ? {
														backgroundColor: 'white',
														color: '#4b5563'
													} : {})
												}}
												onMouseOver={browserInfo.isIE ? (e) => {
													(e.currentTarget as HTMLElement).style.backgroundColor = '#f9fafb';
													(e.currentTarget as HTMLElement).style.color = 'black';
													(e.currentTarget as HTMLElement).style.fontStyle = 'italic';
												} : undefined}
												onMouseOut={browserInfo.isIE ? (e) => {
													(e.currentTarget as HTMLElement).style.backgroundColor = 'white';
													(e.currentTarget as HTMLElement).style.color = '#4b5563';
													(e.currentTarget as HTMLElement).style.fontStyle = 'normal';
												} : undefined}
											>
												{link.name}
											</Link>
										</motion.div>
									))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Full-screen Navigation Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.dialog
						className="fixed inset-0 z-40 bg-black flex items-center justify-center m-0 p-0 w-full h-full max-w-none max-h-none border-none outline-none"
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						aria-modal="true"
						aria-label="Navigation Menu"
						id="main-menu"
						open
						onKeyDown={handleMainMenuKeyDown}
						style={{
							// Ensure proper dialog display in older browsers
							display: 'flex',
							WebkitBoxAlign: 'center',
							WebkitAlignItems: 'center',
							alignItems: 'center', // Standard property
							WebkitBoxPack: 'center',
							WebkitJustifyContent: 'center',
							justifyContent: 'center', // Standard property
						}}
					>
						<motion.nav
							className="flex flex-col items-center text-white w-full px-4 sm:px-6"
							variants={menuContainerVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
							style={{
								WebkitBoxOrient: 'vertical',
								WebkitBoxDirection: 'normal',
								WebkitFlexDirection: 'column',
								flexDirection: 'column', // Standard property
								WebkitBoxAlign: 'center',
								WebkitAlignItems: 'center',
								alignItems: 'center', // Standard property
							}}
						>
							{/* Navigation Links with Numbers */}
							<div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 w-full max-w-4xl">
								{navLinks.map((link, index) => (
									<motion.div
										key={link.id}
										className="flex flex-col items-center text-center"
										variants={menuItemVariants}
										style={{
											WebkitBoxOrient: 'vertical',
											WebkitBoxDirection: 'normal',
											WebkitFlexDirection: 'column',
											flexDirection: 'column', // Standard property
											WebkitBoxAlign: 'center',
											WebkitAlignItems: 'center',
											alignItems: 'center', // Standard property
										}}
									>
										{/* Number indicator */}
										<span 
											className="font-heading text-xs sm:text-sm tracking-wider opacity-60 mb-2 sm:mb-3"
											id={`nav-number-${link.id}`}
											style={{
												// IE fallback for opacity
												...(browserInfo.isIE ? { filter: 'alpha(opacity=60)' } : {})
											}}
										>
											{link.id}
										</span>
										{/* Link text */}
										<Link
											href={link.href}
											className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider hover:[font-style:italic] [transition:opacity_0.3s_ease] hover:opacity-80 ${getFocusRingClasses(true)} rounded-sm`}
											onClick={() => setIsOpen(false)}
											aria-describedby={`nav-number-${link.id}`}
											ref={el => setMenuLinkRef(el, index)}
											style={{
												WebkitTransition: 'opacity 0.3s ease',
												MozTransition: 'opacity 0.3s ease',
												msTransition: 'opacity 0.3s ease',
											}}
											onMouseOver={browserInfo.isIE ? (e) => {
												(e.currentTarget as HTMLElement).style.opacity = '0.8';
												(e.currentTarget as HTMLElement).style.fontStyle = 'italic';
											} : undefined}
											onMouseOut={browserInfo.isIE ? (e) => {
												(e.currentTarget as HTMLElement).style.opacity = '1';
												(e.currentTarget as HTMLElement).style.fontStyle = 'normal';
											} : undefined}
										>
											{link.name}
										</Link>
									</motion.div>
								))}
							</div>
						</motion.nav>
					</motion.dialog>
				)}
			</AnimatePresence>
		</header>
	);
}

export default Header;
