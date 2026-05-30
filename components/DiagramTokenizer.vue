<template>
  <div class="my-8 overflow-x-auto">
    <svg viewBox="0 0 900 340" class="w-full max-w-[900px] mx-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="900" height="340" fill="#fafafa" rx="8" />

      <!-- Title -->
      <text x="450" y="30" text-anchor="middle" font-size="16" fill="#18181b" font-weight="700">Byte Pair Encoding (BPE) Tokenization</text>

      <!-- Original text -->
      <g transform="translate(20, 60)">
        <rect x="0" y="0" width="860" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
        <text x="430" y="30" text-anchor="middle" font-size="14" fill="#92400e" font-family="monospace">"low er"</text>
      </g>

      <!-- Arrow down -->
      <line x1="450" y1="110" x2="450" y2="140" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />

      <!-- Step 1: Character-level tokens -->
      <g transform="translate(20, 145)">
        <rect x="0" y="0" width="860" height="45" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" />
        <text x="20" y="27" font-size="11" fill="#1e40af" font-weight="600">Step 1 — Characters:</text>
        <text x="150" y="27" font-size="13" fill="#3b82f6" font-family="monospace">&lt;low&gt; l o w &lt;/&gt; &lt;low&gt; e r &lt;/&gt;</text>
      </g>

      <!-- Arrow down -->
      <line x1="450" y1="190" x2="450" y2="215" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />

      <!-- Merges table -->
      <g transform="translate(20, 220)">
        <text x="0" y="0" font-size="12" fill="#78716c" font-weight="600">Most frequent merges:</text>

        <rect x="0" y="10" width="860" height="25" rx="4" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" />
        <text x="20" y="27" font-size="11" fill="#166534">"l" + "o" → "lo"  (frequency: 42)</text>

        <rect x="0" y="38" width="860" height="25" rx="4" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" />
        <text x="20" y="55" font-size="11" fill="#166534">"w" + "&lt;/&gt;" → "w&lt;/&gt;"  (frequency: 38)</text>

        <rect x="0" y="66" width="860" height="25" rx="4" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" />
        <text x="20" y="83" font-size="11" fill="#166534">"l" + "o" → "lo" (already merged) → skip</text>

        <rect x="0" y="94" width="860" height="25" rx="4" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" />
        <text x="20" y="111" font-size="11" fill="#166534">"lo" + "w" → "low"  (frequency: 35)</text>

        <rect x="0" y="122" width="860" height="25" rx="4" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" />
        <text x="20" y="139" font-size="11" fill="#166534">"e" + "r" → "er"  (frequency: 31)</text>

        <!-- Result -->
        <rect x="0" y="158" width="860" height="40" rx="8" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" />
        <text x="20" y="182" font-size="11" fill="#3730a3" font-weight="600">Final tokens:</text>
        <text x="120" y="182" font-size="14" fill="#6366f1" font-family="monospace">[&lt;low&gt;, low, er, &lt;/&gt;]</text>
      </g>

      <!-- Right side: vocabulary concept -->
      <g transform="translate(600, 60)">
        <rect x="0" y="0" width="280" height="140" rx="8" fill="#fef9c3" stroke="#eab308" stroke-width="2" />
        <text x="140" y="25" text-anchor="middle" font-size="12" fill="#854d0e" font-weight="600">Vocabulary (partial)</text>

        <text x="15" y="50" font-size="10" fill="#a16207">[0]    → &lt;unk&gt;</text>
        <text x="15" y="65" font-size="10" fill="#a16207">[1]    → &lt;low&gt;</text>
        <text x="15" y="80" font-size="10" fill="#a16207">[245]  → low</text>
        <text x="15" y="95" font-size="10" fill="#a16207">[89]   → er</text>
        <text x="15" y="110" font-size="10" fill="#a16207">[2]    → &lt;/&gt;</text>
        <text x="15" y="130" font-size="10" fill="#eab308" font-style="italic">... ~50,000 tokens total</text>
      </g>

      <!-- Arrow markers -->
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#a1a1aa" />
        </marker>
      </defs>
    </svg>
  </div>
</template>
