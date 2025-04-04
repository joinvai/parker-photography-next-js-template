# BrowserTools MCP Commands Quick Reference

This document summarizes helpful commands provided by the BrowserTools MCP server, based on the [Quickstart guide](https://browsertools.agentdesk.ai/quickstart).

## Analyzing Logs for Debugging & Validation

These tools help inspect logs from the browser.

*   **Get Console Logs:**
    *   **Description:** Returns the most recent console logs from the browser.
*   **Get Console Errors:**
    *   **Description:** Returns the most recent console errors from the browser.
*   **Get XHR Network Logs:**
    *   **Description:** Returns the most recent XHR requests that resulted in an HTTP success response code (e.g., 200s or 300s).
*   **Get XHR Network Errors:**
    *   **Description:** Returns the most recent XHR requests that resulted in an HTTP error response code (e.g., 400s or 500s).

    **Usage Tip:** Asking something like *"Can you check console and network logs to see what went wrong?"* might trigger the agent (like Cursor) to use all four log-checking tools automatically.

*   **Wipe Logs:**
    *   **Description:** Deletes all logs currently stored on the BrowserToolsMCP server.
    *   **Usage Tip:** Use this when you want a clean slate for debugging without needing to refresh the browser. Example: *"Wipe the logs."*

## Updating & Debugging UI Components

These tools help interact with the browser's UI for debugging and development.

*   **Capture Screenshot:**
    *   **Description:** Takes a screenshot of the current browser tab and saves it. By default, it might save to `/user/Downloads/mcp-screenshots`.
    *   **Usage Tip:** Useful when the UI looks incorrect. Example: *"Something doesn’t look right in the UI. Can you take a screenshot?"*
    *   **Configuration:** It's recommended to configure a custom path (in the BrowserToolsMCP extension settings) so screenshots are saved directly into the project workspace, making them easier to share or review.
*   **Get currently selected element:**
    *   **Description:** Returns information about the HTML element currently selected using the browser's developer tools (Element Selector).
    *   **Usage Tip:** Select an element in the browser's dev tools first, then ask the agent to interact with it. Example: *"Can you edit the currently selected element to do x, y and z?"* This can help quickly locate and modify UI components in the codebase.

## Requirements (Summary from Source)

*   NodeJS installed.
*   Google Chrome or a Chromium-based browser.
*   An MCP Client Application (like Cline, Cursor, Claude Desktop, etc.).
*   BrowserToolsMCP Chrome Extension installed and server configured with the MCP client.
*   **Note:** MCP is specific to Anthropic models (like Claude). Ensure the correct model is selected in your agent/editor.
