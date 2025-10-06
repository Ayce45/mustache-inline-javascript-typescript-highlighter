# Mustache Inline Highlighter

[English](#english) | [Français](#français)

---

## English

Syntax highlighting for Mustache templates embedded in TypeScript and JavaScript strings.

## Features

This extension adds syntax highlighting for Mustache expressions (`{{variable}}`, `{{#section}}`, etc.) directly in your TypeScript/JavaScript strings, making your code more readable and maintainable.

### Before
![Without extension](before.png)

### After
![With extension](after.png)

## Supported Syntax

- ✅ Variables: `{{name}}`, `{{user.email}}`
- ✅ Sections: `{{#items}}...{{/items}}`
- ✅ Inverted sections: `{{^items}}...{{/items}}`
- ✅ Comments: `{{! comment }}`
- ✅ Partials: `{{>header}}`

## Supported Languages

- TypeScript (`.ts`, `.tsx`)
- JavaScript (`.js`, `.jsx`)

The extension works in:
- String literals: `"{{name}}"`
- Template literals: `` `{{name}}` ``
- Multiline strings

## Configuration

The extension is fully customizable through VS Code settings.

### Available Settings

| Setting                             | Type   | Default   | Description                              |
| ----------------------------------- | ------ | --------- | ---------------------------------------- |
| `mustacheInline.colors.brackets`    | string | `#C586C0` | Color for braces `{{` and `}}`           |
| `mustacheInline.colors.keywords`    | string | `#C586C0` | Color for control keywords `#`, `^`, `/` |
| `mustacheInline.colors.variables`   | string | `#9CDCFE` | Color for variables and names            |
| `mustacheInline.colors.embedded`    | string | `#4EC9B0` | Color for complete Mustache zone         |
| `mustacheInline.fontStyle.brackets` | string | `bold`    | Font style for braces                    |
| `mustacheInline.fontStyle.keywords` | string | `bold`    | Font style for keywords                  |

### Customization

#### Via GUI

1. Open settings: `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac)
2. Search for "Mustache Inline"
3. Modify colors according to your preferences

#### Via settings.json

```json
{
  "mustacheInline.colors.brackets": "#FF6B6B",
  "mustacheInline.colors.keywords": "#4ECDC4",
  "mustacheInline.colors.variables": "#FFE66D",
  "mustacheInline.colors.embedded": "#95E1D3",
  "mustacheInline.fontStyle.brackets": "bold",
  "mustacheInline.fontStyle.keywords": "bold italic"
}
```

### Predefined Color Themes

#### Default Theme (Dark+)
```json
{
  "mustacheInline.colors.brackets": "#C586C0",
  "mustacheInline.colors.keywords": "#C586C0",
  "mustacheInline.colors.variables": "#9CDCFE",
  "mustacheInline.colors.embedded": "#4EC9B0"
}
```

#### Ocean Theme
```json
{
  "mustacheInline.colors.brackets": "#89DDFF",
  "mustacheInline.colors.keywords": "#C792EA",
  "mustacheInline.colors.variables": "#82AAFF",
  "mustacheInline.colors.embedded": "#8BD5CA"
}
```

#### Warm Theme
```json
{
  "mustacheInline.colors.brackets": "#F78C6C",
  "mustacheInline.colors.keywords": "#FF5370",
  "mustacheInline.colors.variables": "#FFCB6B",
  "mustacheInline.colors.embedded": "#C3E88D"
}
```

## Commands

| Command                         | Description                        |
| ------------------------------- | ---------------------------------- |
| `Mustache Inline: Apply Colors` | Manually reapply configured colors |

To execute a command: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)

## Usage Examples

### TypeScript
```typescript
const template = `
  <h1>{{title}}</h1>
  {{#users}}
    <div class="user">
      <span>{{name}}</span>
      <span>{{email}}</span>
    </div>
  {{/users}}
  {{^users}}
    <p>Aucun utilisateur</p>
  {{/users}}
`;
```

### JavaScript
```javascript
const greeting = "Hello {{user.name}}, you have {{notifications}} notification(s).";

const html = `
  <div>
    {{! This is a comment }}
    {{>header}}
    <main>{{content}}</main>
    {{>footer}}
  </div>
`;
```

## Installation

### From Local Folder

1. Copy the extension folder to `.vscode/extensions/mustache-inline/`
2. Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"

### From Workspace

The extension is automatically loaded if located in the `.vscode/extensions/` folder of your workspace.

## Troubleshooting

### Colors Are Not Applying

1. Check that the extension is activated: open debug console (`Help` → `Toggle Developer Tools`)
2. Look for the message: "Mustache Inline Highlighter est activé"
3. Execute manually: `Ctrl+Shift+P` → "Mustache Inline: Apply Colors"
4. Reload window: `Ctrl+Shift+P` → "Developer: Reload Window"

### Colors Don't Change After Modification

1. Wait a few seconds (application is automatic)
2. If necessary, execute "Mustache Inline: Apply Colors"
3. Verify that hexadecimal values are valid (e.g., `#FF0000`)

### Conflict With Other Extensions

If you have other Mustache highlighting extensions, disable them to avoid conflicts:
1. `Ctrl+Shift+X` → Extensions
2. Search for Mustache extensions
3. Disable conflicting extensions

## Contributing

This extension is developed for internal use. For any suggestions or bugs:

1. Check that the issue doesn't already exist
2. Provide a code example reproducing the problem
3. Include your configuration (`mustacheInline.*` settings)

## License

Internal use - All rights reserved

## Changelog

### 1.0.0 (2025-10-06)

- 🎉 Initial release
- ✨ Syntax highlighting for Mustache in TS/JS strings
- ⚙️ Complete color and style configuration
- 🎨 Custom theme support
- 🔧 Manual reapplication command

## Resources

- [Mustache Documentation](https://mustache.github.io/)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [TextMate Grammar](https://macromates.com/manual/en/language_grammars)

---

**Enjoy coding with beautiful Mustache templates!** 🎨✨

---

## Français

Coloration syntaxique pour les templates Mustache intégrés dans les chaînes de caractères TypeScript et JavaScript.

## Fonctionnalités

Cette extension ajoute la coloration syntaxique pour les expressions Mustache (`{{variable}}`, `{{#section}}`, etc.) directement dans vos strings TypeScript/JavaScript, rendant votre code plus lisible et maintenable.

### Avant
![Sans l'extension](before.png)

### Après
![Avec l'extension](after.png)

## Syntaxe supportée

- ✅ Variables : `{{name}}`, `{{user.email}}`
- ✅ Sections : `{{#items}}...{{/items}}`
- ✅ Sections inversées : `{{^items}}...{{/items}}`
- ✅ Commentaires : `{{! commentaire }}`
- ✅ Partials : `{{>header}}`

## Langages supportés

- TypeScript (`.ts`, `.tsx`)
- JavaScript (`.js`, `.jsx`)

L'extension fonctionne dans :
- Les string literals : `"{{name}}"`
- Les template literals : `` `{{name}}` ``
- Les strings multilignes

## Configuration

L'extension est entièrement personnalisable via les paramètres VS Code.

### Paramètres disponibles

| Paramètre                           | Type   | Défaut    | Description                                     |
| ----------------------------------- | ------ | --------- | ----------------------------------------------- |
| `mustacheInline.colors.brackets`    | string | `#C586C0` | Couleur des accolades `{{` et `}}`              |
| `mustacheInline.colors.keywords`    | string | `#C586C0` | Couleur des mots-clés de contrôle `#`, `^`, `/` |
| `mustacheInline.colors.variables`   | string | `#9CDCFE` | Couleur des variables et noms                   |
| `mustacheInline.colors.embedded`    | string | `#4EC9B0` | Couleur de la zone Mustache complète            |
| `mustacheInline.fontStyle.brackets` | string | `bold`    | Style de police des accolades                   |
| `mustacheInline.fontStyle.keywords` | string | `bold`    | Style de police des mots-clés                   |

### Personnalisation

#### Via l'interface graphique

1. Ouvrez les paramètres : `Ctrl+,` (Windows/Linux) ou `Cmd+,` (Mac)
2. Recherchez "Mustache Inline"
3. Modifiez les couleurs selon vos préférences

#### Via settings.json

```json
{
  "mustacheInline.colors.brackets": "#FF6B6B",
  "mustacheInline.colors.keywords": "#4ECDC4",
  "mustacheInline.colors.variables": "#FFE66D",
  "mustacheInline.colors.embedded": "#95E1D3",
  "mustacheInline.fontStyle.brackets": "bold",
  "mustacheInline.fontStyle.keywords": "bold italic"
}
```

### Thèmes de couleurs prédéfinis

#### Thème par défaut (Dark+)
```json
{
  "mustacheInline.colors.brackets": "#C586C0",
  "mustacheInline.colors.keywords": "#C586C0",
  "mustacheInline.colors.variables": "#9CDCFE",
  "mustacheInline.colors.embedded": "#4EC9B0"
}
```

#### Thème Océan
```json
{
  "mustacheInline.colors.brackets": "#89DDFF",
  "mustacheInline.colors.keywords": "#C792EA",
  "mustacheInline.colors.variables": "#82AAFF",
  "mustacheInline.colors.embedded": "#8BD5CA"
}
```

#### Thème Chaleureux
```json
{
  "mustacheInline.colors.brackets": "#F78C6C",
  "mustacheInline.colors.keywords": "#FF5370",
  "mustacheInline.colors.variables": "#FFCB6B",
  "mustacheInline.colors.embedded": "#C3E88D"
}
```

## Commandes

| Commande                        | Description                                      |
| ------------------------------- | ------------------------------------------------ |
| `Mustache Inline: Apply Colors` | Réapplique manuellement les couleurs configurées |

Pour exécuter une commande : `Ctrl+Shift+P` (Windows/Linux) ou `Cmd+Shift+P` (Mac)

## Exemples d'utilisation

### TypeScript
```typescript
const template = `
  <h1>{{title}}</h1>
  {{#users}}
    <div class="user">
      <span>{{name}}</span>
      <span>{{email}}</span>
    </div>
  {{/users}}
  {{^users}}
    <p>Aucun utilisateur</p>
  {{/users}}
`;
```

### JavaScript
```javascript
const greeting = "Bonjour {{user.name}}, vous avez {{notifications}} notification(s).";

const html = `
  <div>
    {{! Ceci est un commentaire }}
    {{>header}}
    <main>{{content}}</main>
    {{>footer}}
  </div>
`;
```

## Installation

### Depuis le dossier local

1. Copiez le dossier de l'extension dans `.vscode/extensions/mustache-inline/`
2. Rechargez VS Code : `Ctrl+Shift+P` → "Developer: Reload Window"

### Depuis un workspace

L'extension est automatiquement chargée si elle se trouve dans le dossier `.vscode/extensions/` de votre workspace.

## Dépannage

### Les couleurs ne s'appliquent pas

1. Vérifiez que l'extension est activée : ouvrez la console de débogage (`Help` → `Toggle Developer Tools`)
2. Recherchez le message : "Mustache Inline Highlighter est activé"
3. Exécutez manuellement : `Ctrl+Shift+P` → "Mustache Inline: Apply Colors"
4. Rechargez la fenêtre : `Ctrl+Shift+P` → "Developer: Reload Window"

### Les couleurs ne changent pas après modification

1. Attendez quelques secondes (l'application est automatique)
2. Si nécessaire, exécutez "Mustache Inline: Apply Colors"
3. Vérifiez que les valeurs hexadécimales sont valides (ex: `#FF0000`)

### Conflit avec d'autres extensions

Si vous avez d'autres extensions de coloration Mustache, désactivez-les pour éviter les conflits :
1. `Ctrl+Shift+X` → Extensions
2. Recherchez les extensions Mustache
3. Désactivez les extensions en conflit

## Contribution

Cette extension est développée pour un usage interne. Pour toute suggestion ou bug :

1. Vérifiez que le problème n'existe pas déjà
2. Fournissez un exemple de code reproduisant le problème
3. Incluez votre configuration (`mustacheInline.*` settings)

## Licence

Usage interne - Tous droits réservés

## Changelog

### 1.0.0 (2025-10-06)

- 🎉 Version initiale
- ✨ Coloration syntaxique pour Mustache dans les strings TS/JS
- ⚙️ Configuration complète des couleurs et styles
- 🎨 Support des thèmes personnalisés
- 🔧 Commande de réapplication manuelle

## Ressources

- [Documentation Mustache](https://mustache.github.io/)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [TextMate Grammar](https://macromates.com/manual/en/language_grammars)

---

**Profitez du code avec de beaux templates Mustache !** 🎨✨
