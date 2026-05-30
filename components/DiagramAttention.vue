<template>
  <div class="my-8 overflow-x-auto">
    <svg viewBox="0 0 950 420" class="w-full max-w-[950px] mx-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="950" height="420" fill="#fafafa" rx="8" />

      <!-- Title -->
      <text x="475" y="30" text-anchor="middle" font-size="16" fill="#18181b" font-weight="700">Scaled Dot-Product Attention</text>

      <!-- Q, K, V inputs (left side) -->
      <g transform="translate(20, 80)">
        <rect x="0" y="0" width="100" height="60" rx="6" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" />
        <text x="50" y="35" text-anchor="middle" font-size="18" fill="#1e40af" font-weight="700">Q</text>
      </g>
      <g transform="translate(20, 160)">
        <rect x="0" y="0" width="100" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
        <text x="50" y="35" text-anchor="middle" font-size="18" fill="#92400e" font-weight="700">K</text>
      </g>
      <g transform="translate(20, 240)">
        <rect x="0" y="0" width="100" height="60" rx="6" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" />
        <text x="50" y="35" text-anchor="middle" font-size="18" fill="#3730a3" font-weight="700">V</text>
      </g>

      <!-- Q × K^T -->
      <circle cx="220" cy="130" r="45" fill="#fef9c3" stroke="#eab308" stroke-width="2" />
      <text x="220" y="125" text-anchor="middle" font-size="11" fill="#854d0e">Q × K</text>
      <text x="220" y="142" text-anchor="middle" font-size="10" fill="#a16207">Transpose</text>

      <!-- Scale -->
      <circle cx="400" cy="130" r="45" fill="#fef9c3" stroke="#eab308" stroke-width="2" />
      <text x="400" y="125" text-anchor="middle" font-size="11" fill="#854d0e">/ √d_k</text>
      <text x="400" y="142" text-anchor="middle" font-size="9" fill="#a16207">Scale</text>

      <!-- Mask (optional) -->
      <circle cx="580" cy="130" r="45" fill="#fef9c3" stroke="#eab308" stroke-width="2" />
      <text x="580" y="125" text-anchor="middle" font-size="11" fill="#854d0e">Mask</text>
      <text x="580" y="142" text-anchor="middle" font-size="9" fill="#a16207">(opt)</text>

      <!-- Softmax -->
      <circle cx="760" cy="130" r="45" fill="#fce7f3" stroke="#ec4899" stroke-width="2" />
      <text x="760" y="125" text-anchor="middle" font-size="11" fill="#9d174d">Softmax</text>
      <text x="760" y="142" text-anchor="middle" font-size="9" fill="#be185d">σ(·)</text>

      <!-- Attention × V -->
      <circle cx="870" cy="130" r="45" fill="#fef9c3" stroke="#eab308" stroke-width="2" />
      <text x="870" y="125" text-anchor="middle" font-size="11" fill="#854d0e">× V</text>

      <!-- Arrows: Q → Q×K -->
      <line x1="120" y1="110" x2="175" y2="115" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-blue)" />
      <!-- Arrows: K → Q×K -->
      <line x1="120" y1="180" x2="175" y2="145" stroke="#f59e0b" stroke-width="2" marker-end="url(#arrow-amber)" />
      <!-- Arrows: Q×K → Scale -->
      <line x1="265" y1="130" x2="355" y2="130" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />
      <!-- Arrows: Scale → Mask -->
      <line x1="445" y1="130" x2="535" y2="130" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />
      <!-- Arrows: Mask → Softmax -->
      <line x1="625" y1="130" x2="715" y2="130" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />
      <!-- Arrows: Softmax → ×V -->
      <line x1="805" y1="130" x2="825" y2="130" stroke="#a1a1aa" stroke-width="2" marker-end="url(#arrowhead)" />
      <!-- Arrows: V → ×V -->
      <line x1="120" y1="260" x2="825" y2="145" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6,4" marker-end="url(#arrow-purple)" />

      <!-- Output -->
      <g transform="translate(920, 100)">
        <rect x="0" y="0" width="25" height="60" rx="4" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
        <text x="12" y="35" text-anchor="middle" font-size="14" fill="#166534" font-weight="700">Z</text>
      </g>

      <!-- Formula at bottom -->
      <text x="475" y="310" text-anchor="middle" font-size="18" fill="#18181b" font-family="serif" font-style="italic">Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V</text>

      <!-- Multi-head attention breakdown -->
      <g transform="translate(20, 340)">
        <text x="0" y="0" font-size="14" fill="#18181b" font-weight="700">Multi-Head Attention</text>
        <!-- Split into h heads -->
        <rect x="0" y="15" width="200" height="50" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
        <text x="100" y="38" text-anchor="middle" font-size="11" fill="#166534">Input → split into h heads</text>

        <!-- Arrows to parallel attention blocks -->
        <line x1="100" y1="65" x2="100" y2="85" stroke="#a1a1aa" stroke-width="1.5" />
        <line x1="100" y1="85" x2="300" y2="85" stroke="#a1a1aa" stroke-width="1.5" />

        <!-- 4 parallel attention blocks -->
        <rect x="10" y="90" width="65" height="30" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" />
        <text x="42" y="110" text-anchor="middle" font-size="9" fill="#1e40af">Head 1</text>

        <rect x="85" y="90" width="65" height="30" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" />
        <text x="117" y="110" text-anchor="middle" font-size="9" fill="#1e40af">Head 2</text>

        <rect x="160" y="90" width="65" height="30" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" />
        <text x="192" y="110" text-anchor="middle" font-size="9" fill="#1e40af">Head ...</text>

        <rect x="235" y="90" width="65" height="30" rx="4" fill="#dbeafe" stroke="#3b82f6" stroke-width="1.5" />
        <text x="267" y="110" text-anchor="middle" font-size="9" fill="#1e40af">Head h</text>

        <!-- Arrows converge -->
        <line x1="42" y1="120" x2="42" y2="140" stroke="#a1a1aa" stroke-width="1.5" />
        <line x1="117" y1="120" x2="117" y2="140" stroke="#a1a1aa" stroke-width="1.5" />
        <line x1="192" y1="120" x2="192" y2="140" stroke="#a1a1aa" stroke-width="1.5" />
        <line x1="267" y1="120" x2="267" y2="140" stroke="#a1a1aa" stroke-width="1.5" />

        <!-- Concat -->
        <rect x="100" y="140" width="100" height="35" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
        <text x="150" y="155" text-anchor="middle" font-size="10" fill="#92400e">Concat</text>
        <text x="150" y="168" text-anchor="middle" font-size="9" fill="#a16207">(h heads)</text>

        <!-- Linear projection -->
        <line x1="150" y1="175" x2="150" y2="190" stroke="#a1a1aa" stroke-width="1.5" marker-end="url(#arrowhead-sm)" />
        <rect x="100" y="190" width="100" height="35" rx="6" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" />
        <text x="150" y="205" text-anchor="middle" font-size="10" fill="#3730a3">Linear Wᴼ</text>
        <text x="150" y="218" text-anchor="middle" font-size="9" fill="#6366f1">Output</text>

        <!-- Formula -->
        <text x="400" y="130" font-size="13" fill="#78716c">
          <tspan x="400" dy="0">MultiHead(Q,K,V) = Concat(head₁,...,headₕ)Wᴼ</tspan>
          <tspan x="400" dy="20">where headᵢ = Attention(QWᵢQ, KWᵢK, VWᵢV)</tspan>
        </text>
      </g>

      <!-- Arrow markers -->
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#a1a1aa" />
        </marker>
        <marker id="arrowhead-sm" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#a1a1aa" />
        </marker>
        <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
        </marker>
        <marker id="arrow-amber" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
        </marker>
        <marker id="arrow-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
        </marker>
      </defs>
    </svg>
  </div>
</template>
