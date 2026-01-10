// import 'dart:math';
// import 'dart:async';
// import 'package:flutter/material.dart';
// import 'models/roulette_item.dart';
// import 'models/favorite_roulette.dart';
// import 'services/favorites_service.dart';
// import 'edit_roulette_page.dart';
// import 'package:google_mobile_ads/google_mobile_ads.dart';
// import 'package:audioplayers/audioplayers.dart';
// import 'package:shared_preferences/shared_preferences.dart';
// import 'package:in_app_review/in_app_review.dart';

// class RoulettePage extends StatefulWidget {
//   final List<RouletteItem> items;
//   final Color themeColor;
//   final String? title;
//   final bool isFavorite;
//   final String? favoriteId;

//   const RoulettePage({
//     super.key,
//     required this.items,
//     required this.themeColor,
//     this.title,
//     this.isFavorite = false,
//     this.favoriteId,
//   });

//   @override
//   State<RoulettePage> createState() => _RoulettePageState();
// }

// class _RoulettePageState extends State<RoulettePage>
//     with SingleTickerProviderStateMixin {
//   late List<RouletteItem> _items;
//   late String? _currentTitle;
//   late bool _isFavorite;
//   late String _favoriteId;
//   double _rotationAngle = 0;
//   bool _isSpinning = false;
//   final Random _random = Random();
//   late AnimationController _animationController;
//   late Animation<double> _animation;

//   BannerAd? _bannerAd;
//   bool _isBannerAdReady = false;
//   InterstitialAd? _interstitialAd;
//   int _spinCounter = 0;
//   final AudioPlayer _audioPlayer = AudioPlayer();
//   final InAppReview _inAppReview = InAppReview.instance;

//   @override
//   void initState() {
//     super.initState();
//     _items = List.from(widget.items);
//     _currentTitle = widget.title;
//     _isFavorite = widget.isFavorite;
//     _favoriteId = widget.favoriteId ?? FavoritesService.generateId();
//     _animationController = AnimationController(
//       vsync: this,
//       duration: const Duration(milliseconds: 200000),
//     );
//     _loadBannerAd();
//     _loadInterstitialAd();
//     _loadSpinCounter();
//   }

//   @override
//   void dispose() {
//     _animationController.dispose();
//     _bannerAd?.dispose();
//     _interstitialAd?.dispose();
//     _audioPlayer.dispose();
//     super.dispose();
//   }

//   void _loadBannerAd() {
//     _bannerAd = BannerAd(
//       adUnitId: 'ca-app-pub-2243080862412586/4021810874',
//       size: AdSize.banner,
//       request: const AdRequest(),
//       listener: BannerAdListener(
//         onAdLoaded: (_) {
//           setState(() {
//             _isBannerAdReady = true;
//           });
//         },
//         onAdFailedToLoad: (ad, error) {
//           ad.dispose();
//         },
//       ),
//     );
//     _bannerAd!.load();
//   }

//   void _loadInterstitialAd() {
//     InterstitialAd.load(
//       adUnitId: 'ca-app-pub-2243080862412586/1239928384',
//       request: const AdRequest(),
//       adLoadCallback: InterstitialAdLoadCallback(
//         onAdLoaded: (ad) {
//           _interstitialAd = ad;
//         },
//         onAdFailedToLoad: (error) {
//           _interstitialAd = null;
//         },
//       ),
//     );
//   }

//   Future<void> _loadSpinCounter() async {
//     final prefs = await SharedPreferences.getInstance();
//     setState(() {
//       _spinCounter = prefs.getInt('spin_counter') ?? 0;
//     });
//   }

//   Future<void> _incrementSpinCounter() async {
//     final prefs = await SharedPreferences.getInstance();
//     _spinCounter++;
//     await prefs.setInt('spin_counter', _spinCounter);
//   }

//   Future<bool> _shouldShowReview() async {
//     // Check if spin counter has reached threshold
//     if (_spinCounter < 10) return false;

//     // Google's best practices: Don't show too frequently
//     final prefs = await SharedPreferences.getInstance();
//     final lastReviewTime = prefs.getInt('last_review_time') ?? 0;
//     final now = DateTime.now().millisecondsSinceEpoch;
//     final daysSinceLastReview = (now - lastReviewTime) / (1000 * 60 * 60 * 24);

//     // Don't show again if shown within last 30 days
//     if (daysSinceLastReview < 30) return false;

//     // Check if review is available on this platform
//     if (await _inAppReview.isAvailable()) {
//       return true;
//     }

//     return false;
//   }

//   Future<void> _requestInAppReview() async {
//     try {
//       // Save timestamp of review request
//       final prefs = await SharedPreferences.getInstance();
//       await prefs.setInt(
//         'last_review_time',
//         DateTime.now().millisecondsSinceEpoch,
//       );

//       // Reset the counter so we don't show again immediately
//       _spinCounter = 0;
//       await prefs.setInt('spin_counter', 0);

//       // Request the review
//       await _inAppReview.requestReview();
//     } catch (e) {
//       print('Error requesting in-app review: $e');
//     }
//   }

//   Future<void> _toggleFavorite() async {
//     if (_isFavorite) {
//       // Remove from favorites
//       await FavoritesService.removeFavorite(_favoriteId);
//       setState(() {
//         _isFavorite = false;
//       });
//       if (mounted) {
//         ScaffoldMessenger.of(
//           context,
//         ).showSnackBar(const SnackBar(content: Text('Removido dos favoritos')));
//       }
//     } else {
//       // Add to favorites
//       final favorite = FavoriteRoulette(
//         id: _favoriteId,
//         title: _currentTitle,
//         items: _items,
//         themeColor: widget.themeColor,
//       );
//       await FavoritesService.addFavorite(favorite);
//       setState(() {
//         _isFavorite = true;
//       });
//       if (mounted) {
//         ScaffoldMessenger.of(context).showSnackBar(
//           const SnackBar(content: Text('Adicionado aos favoritos!')),
//         );
//       }
//     }
//   }

//   Future<void> _updateFavoriteIfNeeded() async {
//     if (_isFavorite) {
//       final favorite = FavoriteRoulette(
//         id: _favoriteId,
//         title: _currentTitle,
//         items: _items,
//         themeColor: widget.themeColor,
//       );
//       await FavoritesService.updateFavorite(favorite);
//     }
//   }

//   void _playSpinSound() async {
//     try {
//       await _audioPlayer.stop(); // Stop any previous sound
//       await _audioPlayer.play(AssetSource('sounds/spin.mp3'));
//     } catch (e) {
//       print('Error playing spin sound: $e');
//     }
//   }

//   void _spinRoulette() {
//     if (_isSpinning || _items.isEmpty) return;

//     setState(() {
//       _isSpinning = true;
//     });

//     // Play sound first
//     _playSpinSound();

//     // Generate random rotations between 5 and 8 full rotations plus random position
//     final double extraRotations = 5 + _random.nextDouble() * 3;
//     final double randomPosition = _random.nextDouble();
//     final double targetAngle =
//         extraRotations * 2 * pi + (randomPosition * 2 * pi);

//     _animation =
//         Tween<double>(
//           begin: _rotationAngle,
//           end: _rotationAngle + targetAngle,
//         ).animate(
//           CurvedAnimation(
//             parent: _animationController,
//             curve: Curves.easeOutCubic,
//           ),
//         );

//     // Reset and start animation
//     _animationController.reset();
//     _animationController.forward().then((_) async {
//       setState(() {
//         _rotationAngle = _animation.value % (2 * pi);
//         _isSpinning = false;
//       });

//       // Play result sound
//       try {
//         await _audioPlayer.play(AssetSource('sounds/result.mp3'));
//       } catch (e) {
//         print('Error playing result sound: $e');
//       }

//       // Increment spin counter
//       await _incrementSpinCounter();

//       // Check if we should show review
//       if (await _shouldShowReview()) {
//         // Show review after a brief delay
//         Timer(const Duration(seconds: 2), () async {
//           await _requestInAppReview();
//         });
//       }

//       // Show interstitial ad 4 seconds after spin result
//       Timer(const Duration(seconds: 4), () {
//         if (_interstitialAd != null) {
//           _interstitialAd!.show();
//           _loadInterstitialAd();
//         }
//       });
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.grey[100],
//       appBar: AppBar(
//         backgroundColor: widget.themeColor,
//         leading: IconButton(
//           icon: const Icon(Icons.arrow_back, color: Colors.white),
//           onPressed: () => Navigator.of(context).pop(),
//         ),
//         // title: Text(
//         //   widget.title ?? 'Roleta da Sorte',
//         //   style: const TextStyle(color: Colors.white),
//         // ),
//         actions: [
//           // Favorite button
//           Padding(
//             padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
//             child: ElevatedButton.icon(
//               onPressed: _toggleFavorite,
//               icon: Icon(
//                 _isFavorite ? Icons.star : Icons.star_border,
//                 size: 20,
//                 color: widget.themeColor,
//               ),
//               label: Text(
//                 _isFavorite ? 'Favoritado' : 'Favoritar',
//                 style: TextStyle(
//                   color: widget.themeColor,
//                   fontSize: 13,
//                   fontWeight: FontWeight.bold,
//                 ),
//               ),
//               style: ElevatedButton.styleFrom(
//                 backgroundColor: Colors.white,
//                 foregroundColor: widget.themeColor,
//                 elevation: 0,
//                 padding: const EdgeInsets.symmetric(
//                   horizontal: 12,
//                   vertical: 8,
//                 ),
//                 shape: RoundedRectangleBorder(
//                   borderRadius: BorderRadius.circular(25),
//                 ),
//               ),
//             ),
//           ),
//           // Edit button
//           Padding(
//             padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 8),
//             child: ElevatedButton.icon(
//               onPressed: () async {
//                 final result = await Navigator.of(context).push(
//                   MaterialPageRoute(
//                     builder: (context) => EditRoulettePage(
//                       items: _items,
//                       themeColor: widget.themeColor,
//                       title: _currentTitle,
//                       isFavorite: _isFavorite,
//                       favoriteId: _favoriteId,
//                     ),
//                   ),
//                 );
//                 if (result != null && result is Map<String, dynamic>) {
//                   setState(() {
//                     _items = result['items'] as List<RouletteItem>;
//                     _currentTitle = result['title'] as String?;
//                   });
//                   // Update favorite if this is a favorite
//                   await _updateFavoriteIfNeeded();
//                 }
//               },
//               icon: Icon(Icons.edit, size: 20, color: widget.themeColor),
//               label: Text(
//                 'Editar',
//                 style: TextStyle(
//                   color: widget.themeColor,
//                   fontSize: 14,
//                   fontWeight: FontWeight.bold,
//                 ),
//               ),
//               style: ElevatedButton.styleFrom(
//                 backgroundColor: Colors.white,
//                 foregroundColor: widget.themeColor,
//                 elevation: 0,
//                 padding: const EdgeInsets.symmetric(
//                   horizontal: 16,
//                   vertical: 8,
//                 ),
//                 shape: RoundedRectangleBorder(
//                   borderRadius: BorderRadius.circular(25),
//                 ),
//               ),
//             ),
//           ),
//           // IconButton(
//           //   icon: const Icon(Icons.edit, color: Colors.white),
//           //   onPressed: () async {
//           //     final result = await Navigator.of(context).push(
//           //       MaterialPageRoute(
//           //         builder: (context) => EditRoulettePage(
//           //           items: _items,
//           //           themeColor: widget.themeColor,
//           //         ),
//           //       ),
//           //     );
//           //     if (result != null && result is List<RouletteItem>) {
//           //       setState(() {
//           //         _items = result;
//           //       });
//           //     }
//           //   },
//           // ),
//         ],
//       ),
//       body: Column(
//         children: [
//           Expanded(
//             child: Center(
//               child: Column(
//                 mainAxisAlignment: MainAxisAlignment.center,
//                 children: [
//                   // Title above roulette (if provided)
//                   if (_currentTitle != null && _currentTitle!.isNotEmpty)
//                     Padding(
//                       padding: const EdgeInsets.only(bottom: 24),
//                       child: Text(
//                         _currentTitle!,
//                         style: TextStyle(
//                           fontSize: 28,
//                           fontWeight: FontWeight.bold,
//                           color: widget.themeColor,
//                         ),
//                         textAlign: TextAlign.center,
//                       ),
//                     ),
//                   // Roulette Wheel with Fixed Pointer
//                   SizedBox(
//                     width: 300,
//                     height: 300,
//                     child: Stack(
//                       children: [
//                         // Rotating roulette wheel
//                         AnimatedBuilder(
//                           animation: _animationController,
//                           builder: (context, child) {
//                             final currentAngle = _isSpinning
//                                 ? _animation.value
//                                 : _rotationAngle;
//                             return Transform.rotate(
//                               angle: currentAngle,
//                               child: CustomPaint(
//                                 size: const Size(300, 300),
//                                 painter: RoulettePainter(
//                                   items: _items,
//                                   showPointer: false,
//                                 ),
//                               ),
//                             );
//                           },
//                         ),
//                         // Fixed pointer on top
//                         Positioned(
//                           top: 0,
//                           left: 0,
//                           right: 0,
//                           child: CustomPaint(
//                             size: const Size(300, 50),
//                             painter: PointerPainter(),
//                           ),
//                         ),
//                       ],
//                     ),
//                   ),
//                   const SizedBox(height: 40),
//                   // Spin Button
//                   ElevatedButton(
//                     onPressed: _isSpinning ? null : _spinRoulette,
//                     style: ElevatedButton.styleFrom(
//                       backgroundColor: widget.themeColor,
//                       foregroundColor: Colors.white,
//                       padding: const EdgeInsets.symmetric(
//                         horizontal: 48,
//                         vertical: 16,
//                       ),
//                       shape: RoundedRectangleBorder(
//                         borderRadius: BorderRadius.circular(30),
//                       ),
//                       elevation: 8,
//                     ),
//                     child: Text(
//                       _isSpinning ? 'Girando...' : 'GIRAR',
//                       style: const TextStyle(
//                         fontSize: 24,
//                         fontWeight: FontWeight.bold,
//                       ),
//                     ),
//                   ),
//                 ],
//               ),
//             ),
//           ),
//           // Banner Ad Space
//           Container(
//             height: 50,
//             width: double.infinity,
//             margin: const EdgeInsets.symmetric(horizontal: 8),
//             decoration: BoxDecoration(
//               color: Colors.grey.withOpacity(0.1),
//               borderRadius: BorderRadius.circular(8),
//               border: Border.all(color: Colors.grey.withOpacity(0.2)),
//             ),
//             child: _isBannerAdReady && _bannerAd != null
//                 ? AdWidget(ad: _bannerAd!)
//                 : Center(
//                     child: Row(
//                       mainAxisAlignment: MainAxisAlignment.center,
//                       children: [
//                         Icon(
//                           Icons.wifi_off,
//                           color: Colors.grey.withOpacity(0.5),
//                           size: 16,
//                         ),
//                         const SizedBox(width: 8),
//                         Text(
//                           '',
//                           style: TextStyle(
//                             color: Colors.grey.withOpacity(0.5),
//                             fontSize: 12,
//                           ),
//                         ),
//                       ],
//                     ),
//                   ),
//           ),
//         ],
//       ),
//     );
//   }
// }

// class RoulettePainter extends CustomPainter {
//   final List<RouletteItem> items;
//   final bool showPointer;

//   RoulettePainter({required this.items, this.showPointer = true});

//   @override
//   void paint(Canvas canvas, Size size) {
//     if (items.isEmpty) return;

//     final center = Offset(size.width / 2, size.height / 2);
//     final radius = size.width / 2;
//     final sweepAngle = (2 * pi) / items.length;

//     // Draw casino-style border (outermost layers)
//     // Outer gold rim
//     final outerBorderPaint = Paint()
//       ..color =
//           const Color(0xFFD4AF37) // Gold color
//       ..style = PaintingStyle.stroke
//       ..strokeWidth = 12;
//     canvas.drawCircle(center, radius - 6, outerBorderPaint);

//     // Inner dark rim for depth
//     final innerBorderPaint = Paint()
//       ..color =
//           const Color(0xFF8B4513) // Saddle brown
//       ..style = PaintingStyle.stroke
//       ..strokeWidth = 8;
//     canvas.drawCircle(center, radius - 12, innerBorderPaint);

//     // Decorative gold details
//     final detailPaint = Paint()
//       ..color =
//           const Color(0xFFFFD700) // Brighter gold
//       ..style = PaintingStyle.stroke
//       ..strokeWidth = 2;
//     canvas.drawCircle(center, radius - 16, detailPaint);

//     // Draw roulette sections
//     for (int i = 0; i < items.length; i++) {
//       final paint = Paint()
//         ..color = items[i].color
//         ..style = PaintingStyle.fill;

//       final startAngle = i * sweepAngle - pi / 2;

//       canvas.drawArc(
//         Rect.fromCircle(center: center, radius: radius - 20),
//         startAngle,
//         sweepAngle,
//         true,
//         paint,
//       );

//       // Draw border between sections
//       final borderPaint = Paint()
//         ..color = Colors.white
//         ..style = PaintingStyle.stroke
//         ..strokeWidth = 2;

//       canvas.drawArc(
//         Rect.fromCircle(center: center, radius: radius - 20),
//         startAngle,
//         sweepAngle,
//         true,
//         borderPaint,
//       );

//       // Draw text - radiating from center outward along section line
//       final textAngle = startAngle + sweepAngle / 2;

//       final textPainter = TextPainter(
//         text: TextSpan(
//           text: items[i].text,
//           style: const TextStyle(
//             color: Colors.white,
//             fontSize: 12,
//             fontWeight: FontWeight.bold,
//           ),
//         ),
//         textAlign: TextAlign.center,
//         textDirection: TextDirection.ltr,
//       );

//       textPainter.layout();

//       // Position text at 65% radius from center (adjusted for border)
//       final textRadius = (radius - 20) * 0.65;
//       final textX = center.dx + textRadius * cos(textAngle);
//       final textY = center.dy + textRadius * sin(textAngle);

//       canvas.save();
//       canvas.translate(textX, textY);

//       // Rotate text 90 degrees from the radial line (perpendicular to radius)
//       // This makes text tangent to the circle, following the curve
//       canvas.rotate(textAngle);

//       textPainter.paint(
//         canvas,
//         Offset(-textPainter.width / 2, -textPainter.height / 2),
//       );

//       canvas.restore();
//     }

//     // Draw center circle
//     final centerPaint = Paint()
//       ..color = Colors.white
//       ..style = PaintingStyle.fill;

//     canvas.drawCircle(center, 25, centerPaint);

//     // Draw gold border around center circle
//     final centerBorderPaint = Paint()
//       ..color = const Color(0xFFD4AF37)
//       ..style = PaintingStyle.stroke
//       ..strokeWidth = 3;

//     canvas.drawCircle(center, 25, centerBorderPaint);

//     // Draw star in the center
//     _drawStar(canvas, center, 18, const Color(0xFFFFD700));
//   }

//   // Helper method to draw a 5-pointed star
//   void _drawStar(Canvas canvas, Offset center, double size, Color color) {
//     final paint = Paint()
//       ..color = color
//       ..style = PaintingStyle.fill;

//     final path = Path();
//     final outerRadius = size;
//     final innerRadius = size * 0.4;

//     for (int i = 0; i < 5; i++) {
//       // Outer point
//       final outerAngle = (i * 2 * pi / 5) - pi / 2;
//       final outerX = center.dx + outerRadius * cos(outerAngle);
//       final outerY = center.dy + outerRadius * sin(outerAngle);

//       if (i == 0) {
//         path.moveTo(outerX, outerY);
//       } else {
//         path.lineTo(outerX, outerY);
//       }

//       // Inner point
//       final innerAngle = ((i * 2 + 1) * pi / 5) - pi / 2;
//       final innerX = center.dx + innerRadius * cos(innerAngle);
//       final innerY = center.dy + innerRadius * sin(innerAngle);
//       path.lineTo(innerX, innerY);
//     }

//     path.close();
//     canvas.drawPath(path, paint);

//     // Add a subtle border to the star
//     final borderPaint = Paint()
//       ..color =
//           const Color(0xFFB8860B) // Darker gold
//       ..style = PaintingStyle.stroke
//       ..strokeWidth = 1.5;
//     canvas.drawPath(path, borderPaint);
//   }

//   @override
//   bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
// }

// // Fixed pointer painter that doesn't rotate
// class PointerPainter extends CustomPainter {
//   @override
//   void paint(Canvas canvas, Size size) {
//     final pointerPaint = Paint()
//       ..color = Colors.red
//       ..style = PaintingStyle.fill;

//     final centerX = size.width / 2;

//     // Pointer pointing downward into the roulette
//     final pointerPath = Path();
//     pointerPath.moveTo(centerX, 30); // Point at bottom
//     pointerPath.lineTo(centerX - 15, 0); // Left corner at top
//     pointerPath.lineTo(centerX + 15, 0); // Right corner at top
//     pointerPath.close();

//     canvas.drawPath(pointerPath, pointerPaint);

//     // Add white border to pointer for visibility
//     final borderPaint = Paint()
//       ..color = Colors.white
//       ..style = PaintingStyle.stroke
//       ..strokeWidth = 2;

//     canvas.drawPath(pointerPath, borderPaint);
//   }

//   @override
//   bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
// }
