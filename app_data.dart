import 'package:flutter/material.dart';

/// Combined app information including both display info and watermark
class CombinedAppInfo {
  final String name;
  final String packageId;
  final Color color;
  final IconData icon;
  final String? watermarkPath;

  const CombinedAppInfo({
    required this.name,
    required this.packageId,
    required this.color,
    required this.icon,
    this.watermarkPath,
  });

  AppInfo toAppInfo() {
    return AppInfo(
      name: name,
      packageId: packageId,
      color: color,
      icon: icon,
    );
  }

  WatermarkInfo? toWatermarkInfo() {
    if (watermarkPath != null) {
      return WatermarkInfo(
        imagePath: watermarkPath!,
        packageId: packageId,
      );
    }
    return null;
  }
}

/// App information for display in drawer
class AppInfo {
  final String name;
  final String packageId;
  final Color color;
  final IconData icon;

  const AppInfo({
    required this.name,
    required this.packageId,
    required this.color,
    required this.icon,
  });
}

/// Watermark information for carousel
class WatermarkInfo {
  final String imagePath;
  final String packageId;

  const WatermarkInfo({
    required this.imagePath,
    required this.packageId,
  });
}

/// Central repository of all app data
class AppDataRepository {
  static const List<CombinedAppInfo> _allApps = [
    CombinedAppInfo(
      name: 'Mensagens Bom Dia',
      packageId: 'com.mensagensbomdia.app',
      color: Color(0xFF1E9C2E),
      icon: Icons.sunny,
      watermarkPath: 'assets/icon/watermark_dia.webp',
    ),
    CombinedAppInfo(
      name: 'Bíblia Sagrada',
      packageId: 'com.medinabibliasagrada.app',
      color: Color(0xFF62361E),
      icon: Icons.book,
      watermarkPath: 'assets/icon/watermark_biblia.webp',
    ),
    CombinedAppInfo(
      name: 'Mensagens de Natal',
      packageId: 'com.mensagens_de_natal.app',
      color: Color(0xFFAF261C),
      icon: Icons.ac_unit,
      watermarkPath: 'assets/icon/watermark_natal.webp',
    ),
    CombinedAppInfo(
      name: 'Mensagens Aniversário',
      packageId: 'com.mensagens_aniversario.app',
      color: Color(0xFF536834),
      icon: Icons.card_giftcard_outlined,
      watermarkPath: 'assets/icon/watermark_niver.webp',
    ),
    CombinedAppInfo(
      name: 'Livro de Receitas',
      packageId: 'com.livro_de_receitas.app',
      color: Color(0xFFC14442),
      icon: Icons.restaurant_menu_outlined,
      watermarkPath: 'assets/icon/watermark_receitas.webp',
    ),
    CombinedAppInfo(
      name: 'Roleta da Sorte',
      packageId: 'com.roleta_da_sorte.app',
      color: Color(0xFF561490),
      icon: Icons.casino,
      watermarkPath: 'assets/icon/watermark_roleta.webp',
    ),
    CombinedAppInfo(
      name: 'Frases de Tudo',
      packageId: 'com.mensagens_frases_de_tudo.app',
      color: Color(0xFFD55AC1),
      icon: Icons.chat,
      watermarkPath: 'assets/icon/watermark_tudo.webp',
    ),
    CombinedAppInfo(
      name: 'Gerador de Senhas',
      packageId: 'com.gerador_de_senhas.app',
      color: Color(0xFF36AB23),
      icon: Icons.lock,
      watermarkPath: 'assets/icon/watermark_senhas.webp',
    ),
    CombinedAppInfo(
      name: 'Versos Bíblicos',
      packageId: 'com.versosbiblicos.app',
      color: Colors.blueAccent,
      icon: Icons.menu_book,
      watermarkPath: 'assets/icon/watermark_versos.webp',
    ),
    CombinedAppInfo(
      name: 'Frases Motivacionais',
      packageId: 'com.frasesmotivacionais.app',
      color: Colors.deepOrange,
      icon: Icons.lightbulb,
      watermarkPath: 'assets/icon/watermark_motivacionais.webp',
    ),
    CombinedAppInfo(
      name: 'Trechos de Músicas',
      packageId: 'com.trechosmusicas.app',
      color: Color(0xFFFF2C26),
      icon: Icons.music_note,
      watermarkPath: 'assets/icon/watermark_musicas.webp',
    ),
    CombinedAppInfo(
      name: 'Frases de Animes',
      packageId: 'com.frasesanimes.app',
      color: Colors.black,
      icon: Icons.catching_pokemon,
      watermarkPath: 'assets/icon/watermark_animes.webp',
    ),
    CombinedAppInfo(
      name: 'Horóscopo do Dia',
      packageId: 'com.horoscopo.dia.app',
      color: Color(0xFF510482),
      icon: Icons.nightlight_outlined,
      watermarkPath: 'assets/icon/watermark_horoscopo.webp',
    ),
    CombinedAppInfo(
      name: 'Bom dia, Tarde e Noite',
      packageId: 'com.bomdia_boatarde_boanoite.app',
      color: Color(0xFF003A7C),
      icon: Icons.dark_mode,
      watermarkPath: 'assets/icon/watermark_diatardenoite.webp',
    ),
    CombinedAppInfo(
      name: 'Mensagens Boa Tarde',
      packageId: 'com.mensagensboatarde.app',
      color: Color(0xFF43221F),
      icon: Icons.coffee,
      watermarkPath: 'assets/icon/watermark_tarde.webp',
    ),
    CombinedAppInfo(
      name: 'Mensagens Boa Noite',
      packageId: 'com.mensagensboanoite.app',
      color: Color(0xFF120F46),
      icon: Icons.nights_stay_outlined,
      watermarkPath: 'assets/icon/watermark_noite.webp',
    ),
    CombinedAppInfo(
      name: 'Frases de Games',
      packageId: 'com.frasesdegames.app',
      color: Colors.blueGrey,
      icon: Icons.gamepad,
      watermarkPath: 'assets/icon/watermark_games.webp',
    ),
    CombinedAppInfo(
      name: 'Frases da Semana',
      packageId: 'com.frases_dias_da_semana.app',
      color: Color(0xFFFA6147),
      icon: Icons.calendar_month_outlined,
      watermarkPath: 'assets/icon/watermark_semana.webp',
    ),
    CombinedAppInfo(
      name: 'Mensagens de Carnaval',
      packageId: 'com.mensagens_de_carnaval.app',
      color: Color(0xFF127FFA),
      icon: Icons.festival,
      watermarkPath: 'assets/icon/watermark_carnaval.webp',
    ),
    CombinedAppInfo(
      name: 'Chaveiro Pix',
      packageId: 'com.chaveiro_pix_chaves_pix.app',
      color: Color(0xFF2ABBAB),
      icon: Icons.account_balance_wallet,
      watermarkPath: 'assets/icon/watermark_pix.webp',
    ),
    CombinedAppInfo(
      name: 'Frases Dia da Mulher',
      packageId: 'com.mensagens_dia_da_mulher.app',
      color: Color(0xFF4404A3),
      icon: Icons.female,
      watermarkPath: 'assets/icon/watermark_mulher.webp',
    ),
     CombinedAppInfo(
      name: 'Salmo do Dia',
      packageId: 'com.salmo_do_dia_estudar_biblia.app',
      color: Color(0xFF715820),
      icon: Icons.sticky_note_2_outlined,
      watermarkPath: 'assets/icon/watermark_salmo.webp',
    ),
     CombinedAppInfo(
      name: 'Sorteio de Números',
      packageId: 'com.sorteio_numeros_number_raffle.app',
      color: Color(0xFFFDE21E),
      icon: Icons.onetwothree_rounded,
      watermarkPath: 'assets/icon/watermark_sorteios.webp',
    ),
     CombinedAppInfo(
      name: 'Quiz Bíblico',
      packageId: 'com.quiz_biblico_estudar_biblia.app',
      color: Color(0xFF2196F3),
      icon: Icons.question_mark,
      watermarkPath: 'assets/icon/watermark_quizbiblia.webp',
    ),
     CombinedAppInfo(
      name: 'Jogo da Garrafa',
      packageId: 'com.girar_garrafa_spin_bottle.app',
      color: Color(0xFF561490),
      icon: Icons.replay_circle_filled_outlined,
      watermarkPath: 'assets/icon/watermark_garrafa.webp',
    ),
     CombinedAppInfo(
      name: 'Mensagens de Páscoa',
      packageId: 'com.mensagens_de_pascoa.app',
      color: Color(0xFF8DBEBF),
      icon: Icons.egg_outlined,
      watermarkPath: 'assets/icon/watermark_pascoa.webp',
    ),
  ];

  /// Package ID of the current app to exclude from listings
  static const String _currentAppPackageId = 'com.bomdia_boatarde_boanoite.app';

  /// Get list of apps for display in drawer (excluding current app)
  static List<AppInfo> getOtherApps() {
    return _allApps
        .where((app) => app.packageId != _currentAppPackageId)
        .map((app) => app.toAppInfo())
        .toList();
  }

  /// Get list of watermarks for carousel (excluding current app)
  static List<WatermarkInfo> getWatermarkImages() {
    return _allApps
        .where((app) => app.packageId != _currentAppPackageId)
        .map((app) => app.toWatermarkInfo())
        .where((watermark) => watermark != null)
        .cast<WatermarkInfo>()
        .toList();
  }

  /// Get featured app based on time of year
  /// Returns the app that should be highlighted (em destaque)
  static CombinedAppInfo? getFeaturedApp() {
    final currentTime = DateTime.now();
    String? targetPackageId;

    // Check for special date periods first
    if (currentTime.month == 12 && currentTime.day >= 23 && currentTime.day <= 26) {
      // December 23-26: Christmas period
      targetPackageId = 'com.mensagens_de_natal.app';
    } else if ((currentTime.month == 12 && currentTime.day >= 30) ||
        (currentTime.month == 1 && currentTime.day <= 3)) {
      // December 30-31 or January 1-3: New Year period
      // No specific New Year app yet - could be added
      targetPackageId = null;
    } else if (currentTime.month == 2) {
      // February: Carnival period
      targetPackageId = 'com.mensagens_de_carnaval.app';
    } else if (currentTime.month == 3 && currentTime.day <= 10) {
      // March 1-10: Women's Day period
      targetPackageId = 'com.mensagens_dia_da_mulher.app';
    } else if (currentTime.month == 4 && currentTime.day <= 14) {
      // April 1-14: Easter period
      targetPackageId = 'com.mensagens_de_pascoa.app';
    } else {
      // Default time-based logic
      if (currentTime.hour < 12) {
        // Morning: Bom Dia app
        targetPackageId = 'com.mensagensbomdia.app';
      } else if (currentTime.hour < 18) {
        // Afternoon: Boa Tarde app
        targetPackageId = 'com.mensagensboatarde.app';
      } else {
        // Evening: Boa Noite app
        targetPackageId = 'com.mensagensboanoite.app';
      }
    }

    // Find and return the app with the matching package ID
    if (targetPackageId != null) {
      try {
        return _allApps.firstWhere((app) => app.packageId == targetPackageId);
      } catch (e) {
        return null;
      }
    }

    return null;
  }
}
