<template>
  <div class="my-8 overflow-x-auto">
    <svg viewBox="0 0 900 620" class="w-full max-w-[900px] mx-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="900" height="620" fill="#fafafa" rx="8" />

      <!-- Input side: Text Input -->
      <g transform="translate(10, 250)">
        <rect x="0" y="0" width="120" height="80" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
        <text x="60" y="35" text-anchor="middle" font-size="12" fill="#92400e" font-weight="600">Raw Text</text>
        <text x="60" y="55" text-anchor="middle" font-size="10" fill="#78716c">"Hello, world!"</text>
      </g>

      <!-- Arrow -->
      <line x1="135" y1="290" x2="185" y2="290" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />

      <!-- Tokenizer -->
      <g transform="translate(185, 240)">
        <rect x="0" y="0" width="130" height="100" rx="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" />
        <text x="65" y="35" text-anchor="middle" font-size="12" fill="#1e40af" font-weight="600">Tokenizer</text>
        <text x="65" y="55" text-anchor="middle" font-size="10" fill="#64748b">(BPE)</text>
        <text x="65" y="75" text-anchor="middle" font-size="9" fill="#64748b">→ [1, 245, 89]</text>
      </g>

      <!-- Arrow -->
      <line x1="320" y1="290" x2="370" y2="290" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />

      <!-- Embedding Layer -->
      <g transform="translate(370, 240)">
        <rect x="0" y="0" width="130" height="100" rx="8" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" />
        <text x="65" y="35" text-anchor="middle" font-size="12" fill="#3730a3" font-weight="600">Embedding</text>
        <text x="65" y="55" text-anchor="middle" font-size="10" fill="#64748b">Lookup table</text>
        <text x="65" y="75" text-anchor="middle" font-size="9" fill="#64748b">→ [d_model × seq]</text>
      </g>

      <!-- Arrow -->
      <line x1="505" y1="290" x2="555" y2="290" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />

      <!-- Add & Norm (Positional) -->
      <g transform="translate(555, 240)">
        <rect x="0" y="0" width="130" height="100" rx="8" fill="#fce7f3" stroke="#ec4899" stroke-width="2" />
        <text x="65" y="35" text-anchor="middle" font-size="12" fill="#9d174d" font-weight="600">Add &amp; Norm</text>
        <text x="65" y="55" text-anchor="middle" font-size="10" fill="#64748b">Positional</text>
        <text x="65" y="75" text-anchor="middle" font-size="9" fill="#64748b">Encoding + LayNorm</text>
      </g>

      <!-- Arrow -->
      <line x1="690" y1="290" x2="740" y2="290" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />

      <!-- Transformer Block (repeated) -->
      <g transform="translate(740, 220)">
        <!-- Outer box -->
        <rect x="0" y="0" width="150" height="140" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" stroke-dasharray="6,3" />
        <text x="75" y="25" text-anchor="middle" font-size="12" fill="#166534" font-weight="600">Transformer</text>
        <text x="75" y="40" text-anchor="middle" font-size="12" fill="#166534" font-weight="600">Block × N</text>

        <!-- Inside: Multi-Head Attention -->
        <rect x="20" y="50" width="110" height="30" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" />
        <text x="75" y="69" text-anchor="middle" font-size="10" fill="#1e40af">Multi-Head Attn</text>

        <!-- Inside: Feed Forward -->
        <rect x="20" y="90" width="110" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
        <text x="75" y="109" text-anchor="middle" font-size="10" fill="#92400e">Feed-Forward</text>

        <!-- Arrows inside -->
        <line x1="75" y1="80" x2="75" y2="88" stroke="#a1a1aa" stroke-width="1.5" marker-end="url(#arrowhead-sm)" />
      </g>

      <!-- Arrow from block to output -->
      <line x1="895" y1="290" x2="920" y2="290" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />

      <!-- Output -->
      <g transform="translate(740, 380)">
        <rect x="0" y="0" width="150" height="100" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
        <text x="75" y="30" text-anchor="middle" font-size="12" fill="#166534" font-weight="600">LM Head</text>
        <text x="75" y="50" text-anchor="middle" font-size="10" fill="#64748b">Linear(d→vocab)</text>

        <!-- Softmax -->
        <rect x="20" y="60" width="110" height="30" rx="4" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5" />
        <text x="75" y="79" text-anchor="middle" font-size="10" fill="#3730a3">Softmax → Prob</text>
      </g>

      <!-- Arrow from block down to LM Head -->
      <path d="M815 360 L815 380" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />

      <!-- Arrows from input flow down to output area -->
      <line x1="170" y1="350" x2="170" y2="420" stroke="#a1a1aa" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.3" />
      <line x1="815" y1="360" x2="815" y2="378" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />

      <!-- Arrow head markers -->
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#a1a1aa" />
        </marker>
        <marker id="arrowhead-sm" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#a1a1aa" />
        </marker>
      </defs>

      <!-- Legend -->
      <g transform="translate(20, 540)">
        <text x="0" y="0" font-size="11" fill="#78716c" font-weight="600">Legend:</text>
        <rect x="70" y="-8" width="12" height="12" rx="2" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
        <text x="88" y="2" font-size="10" fill="#78716c">Input</text>
        <rect x="140" y="-8" width="12" height="12" rx="2" fill="#dbeafe" stroke="#3b82f6" stroke-width="1" />
        <text x="158" y="2" font-size="10" fill="#78716c">Processing</text>
        <rect x="240" y="-8" width="12" height="12" rx="2" fill="#e0e7ff" stroke="#6366f1" stroke-width="1" />
        <text x="258" y="2" font-size="10" fill="#78716c">Embedding</text>
        <rect x="330" y="-8" width="12" height="12" rx="2" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" />
        <text x="348" y="2" font-size="10" fill="#78716c">Transformer</text>
      </g>
    </svg>
  </div>
</template>
