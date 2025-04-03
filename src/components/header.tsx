'use client'; // Needed for useState and Framer Motion

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming utils exists for cn function

function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// Variants for the hamburger lines animation
	const topVariants = {
		closed: { rotate: 0, translateY: 0 },
		open: { rotate: 45, translateY: 6 }, // Adjust translateY based on line height/spacing
	};

	const middleVariants = {
		closed: { opacity: 1 },
		open: { opacity: 0 },
	};

	const bottomVariants = {
		closed: { rotate: 0, translateY: 0 },
		open: { rotate: -45, translateY: -6 }, // Adjust translateY based on line height/spacing
	};

	// Variants for the overlay
	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	// Variants for menu items container (stagger children)
	const menuContainerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1, // Delay between each child animation
				delayChildren: 0.3, // Delay before the first child starts
			},
		},
	};

	// Variants for individual menu items
	const menuItemVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: { opacity: 1, y: 0 },
	};

	const navLinks = [
		{ id: '01', name: 'Home', href: '/' },
		{ id: '02', name: 'Studio', href: '/studio' },
		{ id: '03', name: 'Projects', href: '/projects' },
		{ id: '04', name: 'Contact', href: '/contact' },
	];

	return (
		<>
			<header className="fixed top-0 left-0 z-50 p-4">
				{/* Hamburger Button */}
				<motion.button
					onClick={toggleMenu}
					className="relative z-50 w-8 h-6 flex flex-col justify-between items-center"
					aria-label="Toggle menu"
					animate={isOpen ? 'open' : 'closed'}
					initial={false}
				>
					{/* Top line */}
					<motion.div
						className="w-full h-0.5 bg-black origin-center"
						variants={topVariants}
						transition={{ duration: 0.3 }}
					/>
					{/* Middle line */}
					<motion.div
						className="w-full h-0.5 bg-black"
						variants={middleVariants}
						transition={{ duration: 0.1 }} // Faster fade out
					/>
					{/* Bottom line */}
					<motion.div
						className="w-full h-0.5 bg-black origin-center"
						variants={bottomVariants}
						transition={{ duration: 0.3 }}
					/>
				</motion.button>
			</header>

			{/* Overlay Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.5, ease: 'easeInOut' }}
					>
						<motion.div
							className="flex flex-col items-center text-white space-y-8"
							variants={menuContainerVariants}
							initial="hidden"
							animate="visible"
							exit="hidden" // Add exit here if needed for children on close
						>
							{/* Logo */}
							<motion.div
								className="text-4xl font-bold mb-12 knockout-logo" // Add specific class for knockout if needed
								variants={menuItemVariants}
							>
								Acme
							</motion.div>

							{/* Navigation Links */}
							{navLinks.map((link) => (
								<motion.a
									key={link.id}
									href={link.href}
									className="flex flex-col items-center text-center group"
									variants={menuItemVariants}
									whileHover={{ scale: 1.05 }}
									transition={{ type: 'spring', stiffness: 300 }}
								>
									<span className="text-xs opacity-70 mb-1">{link.id}</span>
									<span className="text-2xl font-medium group-hover:opacity-80 transition-opacity">
										{link.name}
									</span>
								</motion.a>
							))}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

export default Header;
