# Adobe Premiere Plugin

A plugin that brings the search power of Scrounger into Adobe Premiere Pro.
This allows editors to access Scrounger natively in Adobe Premiere Pro and
import the results of their searches directly into their projects.

## How It Works

The panel is a simple static html page that lets the user fill in the url
of their Scrounger application on the web, and the location to save the imported
assets on their computer. Once the user clicks “Go”, they are redirected to the
url provided. The Scrounger web application was slightly modified to detect when
it runs inside a Premiere Pro panel to enable the “Import Asset” button.

For more information on how plugins work, and how they communicate with Adobe
Premiere Pro and with the computer file system, check out their
[Getting Started Guides](https://github.com/Adobe-CEP/Getting-Started-guides)
and other [CEP Resources](https://github.com/Adobe-CEP/CEP-Resources).

## Getting Started

### Prerequisites

- Adobe Premiere Pro 2020
- Local Scrounger install (optional)

### Installation

1. Clone the project:

```
git clone git@github.com:TheBoonAI/scrounger.git && cd scrounger/adobe_premiere_plugin
```

2. Create the Adobe Premiere Pro extensions folder if it doesn’t already exist:

```
mkdir -p ~/Library/Application\ Support/Adobe/CEP/extensions
```

3. Create a symbolic link between the `adobe_premiere_plugin` folder and the
   Adobe Premiere Pro extensions folder:

```
ln -s "$(pwd)" ~/Library/Application\ Support/Adobe/CEP/extensions/scrounger
```

4. Adobe Premiere Pro requires plugins to be signed with a certificate,
   otherwise it will silently fail to open the plugin. To get around this
   limitation, it is necessary to
   [change the debug mode](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_10.x/Documentation/CEP%2010.0%20HTML%20Extension%20Cookbook.md#debugging-unsigned-extensions):

#### Windows

> Open regedit > HKEY_CURRENT_USER/Software/Adobe/CSXS.10, then add a new entry
> PlayerDebugMode of type “string” with the value of “1”.

#### macOS

> In the Terminal, type: `defaults write com.adobe.CSXS.10 PlayerDebugMode 1`

You may have to restart the `cfprefsd` process and/or reboot your computer.

5. Open Adobe Premiere Pro and click the Window menu > Extensions > Scrounger by
   Boon AI.

## Debugging

After opening Adobe Premiere Pro and the Scrounger panel, open
http://localhost:8080/ to access the Chrome Developer Tools attached to the
plugin. More information is available in the
[official documentation](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging).

## Development

All the code for this plugin is in the `client/index.html` file. You can edit it
and manually refresh the page. You can also refer to the `react_frontend`
documentation to run a local instance of Scrounger and use that as your deployed
url.

### Deployment / Publishing

_Coming Soon_ Sign and package plugin

## Ressources

- https://github.com/Adobe-CEP/Getting-Started-guides
- https://github.com/Adobe-CEP/CEP-Resources
- https://github.com/Adobe-CEP/Samples
- https://javascript-tools-guide.readthedocs.io
- https://premiere-scripting-guide.readthedocs.io
