'use client'; // Needed for useState and Framer Motion

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming utils exists for cn function
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
	defaultLogo?: 'black' | 'white';
}

function Header({ defaultLogo = 'black' }: HeaderProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// Variants for the hamburger lines animation - 300ms duration as per brief
	const topVariants = {
		closed: { rotate: 0, translateY: 0, backgroundColor: '#000' },
		open: { rotate: 45, translateY: 7, backgroundColor: '#fff' },
	};

	const bottomVariants = {
		closed: { rotate: 0, translateY: 0, backgroundColor: '#000' },
		open: { rotate: -45, translateY: -7, backgroundColor: '#fff' },
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

	return (
		<>
			<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-8">
				{/* Hamburger Button with Menu Text */}
				<div className="flex items-center gap-4 z-50">
					<button
						onClick={toggleMenu}
						type="button"
						className="relative w-11 h-11 flex flex-col justify-center items-center"
						aria-label={isOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={isOpen}
					>
						<span className={`bg-black block transition-all duration-300 ease-out 
							h-0.5 w-6 rounded-sm ${isOpen ? 
							'rotate-45 translate-y-1 bg-white' : '-translate-y-0.5'
							}`}>
						</span>
						<span className={`bg-black block transition-all duration-300 ease-out 
							h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 
							'opacity-0 bg-white' : 'opacity-100'
							}`}>
						</span>
						<span className={`bg-black block transition-all duration-300 ease-out 
							h-0.5 w-6 rounded-sm ${isOpen ? 
							'-rotate-45 -translate-y-1 bg-white' : 'translate-y-0.5'
							}`}>
						</span>
					</button>
					<button
						onClick={toggleMenu}
						type="button"
						className={`font-heading font-light text-sm tracking-wider [transition:color_0.3s_ease] hover:[font-style:italic] ${
							isOpen ? 'text-white' : 'text-black'
						}`}
					>
						{isOpen ? 'CLOSE' : 'MENU'}
					</button>
				</div>

				{/* Centered Logo */}
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-8 z-50">
					<Link href="/">
						<Image
							src={`/logos/${isOpen ? 'white' : defaultLogo}-logo.svg`}
							alt="Logo"
							width={100}
							height={100}
							priority
						/>
					</Link>
				</div>
			</header>

			{/* Full-screen Navigation Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 z-40 bg-black flex items-center justify-center"
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						role="dialog"
						aria-modal="true"
						aria-label="Navigation Menu"
					>
						<motion.nav
							className="flex flex-col items-center text-white"
							variants={menuContainerVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
						>
							{/* Navigation Links with Numbers */}
							<div className="space-y-12 md:space-y-16">
								{navLinks.map((link) => (
									<motion.div
										key={link.id}
										className="flex flex-col items-center text-center"
										variants={menuItemVariants}
									>
										{/* Number indicator */}
										<span className="font-heading text-sm tracking-wider opacity-60 mb-3">{link.id}</span>
										{/* Link text */}
										<Link
											href={link.href}
											className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wider hover:[font-style:italic] [transition:opacity_0.3s_ease] hover:opacity-80"
											onClick={() => setIsOpen(false)}
										>
											{link.name}
										</Link>
									</motion.div>
								))}
							</div>
						</motion.nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

export default Header;
