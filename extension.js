const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Mustache Inline Highlighter est activé');

    // Fonction pour récupérer les couleurs du thème actif depuis tokenColorCustomizations
    function getThemeColors() {
        console.log('[Mustache] === Getting theme colors ===');

        // Récupérer les règles TextMate existantes (qui contiennent les couleurs du thème)
        const editorConfig = vscode.workspace.getConfiguration('editor');
        const tokenCustomizations = editorConfig.inspect('tokenColorCustomizations');

        // Inspecter toutes les sources de configuration
        console.log('[Mustache] Token customizations sources:', {
            hasDefaultValue: !!tokenCustomizations?.defaultValue,
            hasGlobalValue: !!tokenCustomizations?.globalValue,
            hasWorkspaceValue: !!tokenCustomizations?.workspaceValue,
            hasWorkspaceFolderValue: !!tokenCustomizations?.workspaceFolderValue
        });

        // Récupérer toutes les règles (en donnant priorité aux différentes sources)
        const allRules = [
            ...(tokenCustomizations?.workspaceFolderValue?.textMateRules || []),
            ...(tokenCustomizations?.workspaceValue?.textMateRules || []),
            ...(tokenCustomizations?.globalValue?.textMateRules || []),
            ...(tokenCustomizations?.defaultValue?.textMateRules || [])
        ];

        console.log('[Mustache] Total rules found:', allRules.length);

        // Chercher les couleurs pour des scopes similaires (en excluant mustache)
        const findColorForScope = (scopePatterns) => {
            for (const pattern of scopePatterns) {
                const rule = allRules.find(r =>
                    r.scope &&
                    !r.scope.includes('mustache') &&
                    (typeof r.scope === 'string' ? r.scope.includes(pattern) :
                        Array.isArray(r.scope) && r.scope.some(s => s.includes(pattern)))
                );
                if (rule?.settings?.foreground) {
                    console.log(`[Mustache] Found color for pattern '${pattern}':`, rule.settings.foreground, 'in scope:', rule.scope);
                    return rule.settings.foreground;
                }
            }
            return null;
        };

        // Récupérer le type de thème pour les couleurs par défaut
        const colorTheme = vscode.window.activeColorTheme;
        const isDark = colorTheme.kind === vscode.ColorThemeKind.Dark ||
            colorTheme.kind === vscode.ColorThemeKind.HighContrastDark;

        console.log('[Mustache] Theme kind:', ['Light', 'Dark', 'HighContrast', 'HighContrastLight'][colorTheme.kind - 1]);

        // Chercher les couleurs dans le thème actif
        const keywordColor = findColorForScope(['keyword.control', 'keyword.operator', 'keyword']) ||
            (isDark ? '#C586C0' : '#AF00DB');
        const variableColor = findColorForScope(['variable.other', 'variable.parameter', 'variable']) ||
            (isDark ? '#9CDCFE' : '#001080');
        const punctuationColor = findColorForScope(['punctuation.definition', 'punctuation.bracket', 'punctuation']) ||
            (isDark ? '#D4D4D4' : '#000000');
        const embeddedColor = findColorForScope(['meta.embedded', 'string.quoted', 'entity.name.type']) ||
            (isDark ? '#4EC9B0' : '#098658');

        const colors = {
            keywordColor,
            variableColor,
            punctuationColor,
            embeddedColor
        };

        console.log('[Mustache] Final theme colors:', colors);
        return colors;
    }    // Fonction pour appliquer les couleurs
    function applyColors() {
        console.log('[Mustache] === Applying colors ===');

        const config = vscode.workspace.getConfiguration('mustacheInline');
        const themeColors = getThemeColors();

        // Récupérer les couleurs depuis la configuration ou utiliser celles du thème
        const configBrackets = config.get('colors.brackets');
        const configKeywords = config.get('colors.keywords');
        const configVariables = config.get('colors.variables');
        const configEmbedded = config.get('colors.embedded');

        console.log('[Mustache] Config values:', {
            brackets: configBrackets,
            keywords: configKeywords,
            variables: configVariables,
            embedded: configEmbedded
        });

        const bracketsColor = configBrackets || themeColors.punctuationColor;
        const keywordsColor = configKeywords || themeColors.keywordColor;
        const variablesColor = configVariables || themeColors.variableColor;
        const embeddedColor = configEmbedded || themeColors.embeddedColor;
        const bracketsFontStyle = config.get('fontStyle.brackets', 'bold');
        const keywordsFontStyle = config.get('fontStyle.keywords', 'bold');

        console.log('[Mustache] Final colors to apply:', {
            brackets: bracketsColor,
            keywords: keywordsColor,
            variables: variablesColor,
            embedded: embeddedColor
        });

        // Obtenir la configuration actuelle de tokenColorCustomizations
        const editorConfig = vscode.workspace.getConfiguration('editor');
        const currentCustomizations = editorConfig.get('tokenColorCustomizations') || {};
        const currentRules = currentCustomizations.textMateRules || [];

        // Filtrer les règles existantes pour retirer celles de Mustache
        const filteredRules = currentRules.filter(rule =>
            !rule.scope || !rule.scope.includes('mustache')
        );

        // Ajouter les nouvelles règles Mustache
        const mustacheRules = [
            {
                scope: 'punctuation.definition.tag.begin.mustache',
                settings: {
                    foreground: bracketsColor,
                    fontStyle: bracketsFontStyle
                }
            },
            {
                scope: 'punctuation.definition.tag.end.mustache',
                settings: {
                    foreground: bracketsColor,
                    fontStyle: bracketsFontStyle
                }
            },
            {
                scope: 'keyword.control.mustache',
                settings: {
                    foreground: keywordsColor,
                    fontStyle: keywordsFontStyle
                }
            },
            {
                scope: 'variable.other.mustache',
                settings: {
                    foreground: variablesColor
                }
            },
            {
                scope: 'meta.embedded.inline.mustache',
                settings: {
                    foreground: embeddedColor
                }
            }
        ];

        // Combiner les règles
        const newRules = [...filteredRules, ...mustacheRules];

        // Mettre à jour la configuration
        const newCustomizations = {
            ...currentCustomizations,
            textMateRules: newRules
        };

        // Nettoyer d'abord la configuration workspace pour éviter les conflits
        editorConfig.update('tokenColorCustomizations', undefined, vscode.ConfigurationTarget.Workspace);

        // Appliquer dans la configuration utilisateur (Global)
        editorConfig.update('tokenColorCustomizations', newCustomizations, vscode.ConfigurationTarget.Global)
            .then(() => {
                console.log('[Mustache] Colors applied successfully!');
                console.log('[Mustache] Total TextMate rules:', newRules.length);
                console.log('[Mustache] Mustache rules:', mustacheRules.length);
            }, (error) => {
                console.error('[Mustache] Error applying colors:', error);
            });
    }

    // Appliquer les couleurs au démarrage
    applyColors();

    // Écouter les changements de configuration
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('mustacheInline')) {
                console.log('[Mustache] Config changed: mustacheInline');
                applyColors();
            }
            if (e.affectsConfiguration('workbench.colorTheme')) {
                console.log('[Mustache] Config changed: workbench.colorTheme');
                applyColors();
            }
        })
    );

    // Écouter les changements de thème de couleur
    context.subscriptions.push(
        vscode.window.onDidChangeActiveColorTheme((theme) => {
            console.log('[Mustache] Color theme changed:', theme.kind);
            applyColors();
        })
    );

    // Commande pour réappliquer les couleurs manuellement
    let disposable = vscode.commands.registerCommand('mustacheInline.applyColors', applyColors);
    context.subscriptions.push(disposable);
}

function deactivate() {
    // Nettoyer les règles Mustache lors de la désinstallation
    const editorConfig = vscode.workspace.getConfiguration('editor');
    const currentCustomizations = editorConfig.get('tokenColorCustomizations') || {};
    const currentRules = currentCustomizations.textMateRules || [];

    // Filtrer pour retirer toutes les règles Mustache
    const filteredRules = currentRules.filter(rule =>
        !rule.scope || !rule.scope.includes('mustache')
    );

    // Mettre à jour la configuration sans les règles Mustache
    const newCustomizations = {
        ...currentCustomizations,
        textMateRules: filteredRules
    };

    // Nettoyer dans la configuration utilisateur (Global)
    editorConfig.update('tokenColorCustomizations', newCustomizations, vscode.ConfigurationTarget.Global);
    // Nettoyer aussi dans la configuration workspace si elle existe
    editorConfig.update('tokenColorCustomizations', newCustomizations, vscode.ConfigurationTarget.Workspace);

    // Supprimer les configurations personnalisées de mustacheInline
    const mustacheConfig = vscode.workspace.getConfiguration('mustacheInline');
    const configKeys = [
        'colors.brackets',
        'colors.keywords',
        'colors.variables',
        'colors.embedded',
        'fontStyle.brackets',
        'fontStyle.keywords'
    ];

    // Supprimer chaque clé de configuration aux deux niveaux
    configKeys.forEach(key => {
        mustacheConfig.update(key, undefined, vscode.ConfigurationTarget.Global);
        mustacheConfig.update(key, undefined, vscode.ConfigurationTarget.Workspace);
    });
}

module.exports = {
    activate,
    deactivate
};
