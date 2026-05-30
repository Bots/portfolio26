<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-12">
      <span class="inline-block px-3 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full mb-4">Interactive Tutorial</span>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4">Let's Build GPT</h1>
      <p class="text-lg text-zinc-600 dark:text-zinc-300 mb-4">
        A thorough, interactive tutorial based on Andrej Karpathy's "Let's Build GPT" series.
        You'll build a GPT model from scratch — character by character, token by token, weight by weight.
      </p>
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        Inspired by <a href="https://www.youtube.com/watch?v=VMj-3S1qp0o" target="_blank" rel="noopener" class="text-orange-500 hover:text-orange-600">Karpathy's YouTube series</a>.
      </p>
    </div>

    <!-- Progress sidebar -->
    <div ref="sidebarRef" class="hidden lg:block fixed right-8 top-24 w-48">
      <nav class="space-y-1">
        <NuxtLink
          v-for="(section, i) in sections"
          :key="section.id"
          :to="`#${section.id}`"
          class="block text-xs py-1 px-2 rounded transition-colors"
          :class="activeSection === section.id ? 'text-orange-500 font-medium bg-orange-50' : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'"
        >
          {{ i + 1 }}. {{ section.label }}
        </NuxtLink>
      </nav>
    </div>

    <!-- Main content with left margin for sidebar space -->
    <div class="lg:mr-52 space-y-16">
      <!-- Section 1: Introduction -->
      <TutorialSection id="intro" step="1" title="What is GPT?" subtitle="Understanding the big picture before diving into code.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          GPT stands for <strong>Generative Pre-trained Transformer</strong>. It's a type of language model that generates text one token at a time. Despite their complexity, GPT models are built from relatively simple components: matrix multiplications, additions, and a few clever tricks.
        </p>

        <div class="bg-blue-50 dark:bg-black dark:border-blue-500 border-l-4 border-blue-400 p-4 my-4">
          <p class="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key insight:</strong> GPT is an <em>autoregressive</em> model — it predicts the next token given all previous tokens. This simple idea, scaled up with more data and compute, produces remarkably capable language models.
          </p>
        </div>

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The architecture Karpathy walks us through consists of:
        </p>

        <ul class="space-y-2 text-zinc-700 dark:text-zinc-300">
          <li class="flex items-start gap-2"><span class="text-orange-500 mt-1">▸</span> A <strong>tokenizer</strong> that converts raw text into token IDs</li>
          <li class="flex items-start gap-2"><span class="text-orange-500 mt-1">▸</span> An <strong>embedding layer</strong> that maps tokens to dense vectors</li>
          <li class="flex items-start gap-2"><span class="text-orange-500 mt-1">▸</span> A series of <strong>transformer blocks</strong>, each with attention and feed-forward layers</li>
          <li class="flex items-start gap-2"><span class="text-orange-500 mt-1">▸</span> An <strong>output head</strong> that maps back to vocabulary probabilities</li>
        </ul>

        <DiagramTransformer />

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The entire model is essentially a big computation graph. You feed in token IDs, they flow through matrix multiplications and activations, and you get out a probability distribution over the next token. You sample from that distribution, append the chosen token, and repeat.
        </p>

        <InteractiveCodeBlock
          description="Write a simple character-level tokenizer. It needs three parts: (1) build vocabulary, (2) encode text to IDs, (3) decode IDs back to text."
          explanation="Think of a tokenizer as a dictionary. Each unique character gets a number. 'hello' becomes [0, 1, 2, 2, 3] if h=0, e=1, l=2, o=3."
          guide="self.vocab = sorted(set(text))\nself.str2id = {ch: i for i, ch in enumerate(self.vocab)}\nself.id2str = {i: ch for i, ch in enumerate(self.vocab)}"
          placeholder="# Your task: Write a simple char-level vocab builder
class SimpleTokenizer:
    def __init__(self, text):
        # Step 1: Get all unique characters and sort them
        chars = ...
        
        # Step 2: Create a dict mapping character -> ID (0, 1, 2, ...)
        self.str2id = ...
        
        # Step 3: Create the reverse dict: ID -> character
        self.id2str = ...

    def encode(self, text):
        # Convert each character in text to its ID number
        return [self.str2id[c] for c in text]

    def decode(self, ids):
        # Convert each ID back to its character, then join
        return ''.join([self.id2str[i] for i in ids])"
          hint="Use sorted(set(text)) to get unique characters. Use enumerate() to assign IDs."
          hintDetail="str2id maps 'h' -> 0, 'e' -> 1, etc. id2str does the reverse: 0 -> 'h', 1 -> 'e'."
          hintFull="Look at the solution below — it's just 4 lines of setup in __init__."
          :checkFn="(code) => code.includes('set') && code.includes('encode') && code.includes('decode')"
          :solution="solutions.simple_tokenizer"
        />
      </TutorialSection>

      <!-- Section 2: Data Generation -->
      <TutorialSection id="data" step="2" title="Generating Training Data" subtitle="Creating a dataset to train our model on.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Before training, we need data. In Karpathy's tutorial, he uses a simple text file (like all of Shakespeare or a Bible). For our purposes, let's imagine we're training on a corpus of text and need to create input-output pairs for supervised learning.
        </p>

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The core idea: given a sequence of tokens, the model should predict the next token. So for the text <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">[A, B, C, D]</code>, our training pairs are:
        </p>

        <div class="bg-zinc-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
          Input:  [A]       → Target: B<br/>
          Input:  [A, B]    → Target: C<br/>
          Input:  [A, B, C] → Target: D
        </div>

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Each training example is a context window — a fixed-length sequence of tokens. The model learns to predict what comes next within that window.
        </p>

        <InteractiveCodeBlock
          description="Create training pairs: input is a window of tokens, target is the NEXT token after that window."
          explanation="If tokens = [0, 1, 2, 3, 4] and block_size=3, then: X=[0,1,2]→Y=3, X=[1,2,3]→Y=4. Each input predicts what comes right after it."
          guide="x = tokens[i : i + block_size]\ny = tokens[i + block_size]"
          placeholder="import torch\n\ndef create_training_data(tokens, block_size):\n    X = []  # inputs (context windows)\n    Y = []  # targets (next token after each window)\n    \n    # Loop through all positions where we can form a complete window\n    for i in range(len(tokens) - block_size):\n        # x = the context window: tokens from position i to i+block_size\n        x = ...\n        \n        # y = the single token right after the window\n        y = ...\n        \n        X.append(x)\n        Y.append(y)\n    \n    return X, Y"
          hint="Python slicing: tokens[start:end] gives elements from start (inclusive) to end (exclusive)."
          hintDetail="x gets block_size elements starting at i. y gets just the one element right after x ends."
          hintFull="x = tokens[i : i + block_size], y = tokens[i + block_size]"
          :checkFn="(code) => code.includes('range') && code.includes('append') && code.includes('block_size')"
          :solution="solutions.create_training_data"
        />

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-6">
          Now let's convert these to PyTorch tensors and think about batching. In practice, we don't process one example at a time — we process <strong>batches</strong>. A batch is a 2D tensor of shape <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">(batch_size, block_size)</code>.
        </p>

        <InteractiveCodeBlock
          description="Create a batch: pick random starting positions, then extract context windows and targets for each."
          explanation="A batch processes multiple examples at once. We randomly pick batch_size starting positions in the data, then extract block_size-sized windows from each position."
          guide="ix = torch.randint(0, n - block_size, (batch_size,))\nx = torch.stack([data[i : i + block_size] for i in ix])"
          placeholder="import torch\n\ndef get_batch(data, batch_size, block_size, device='cpu'):\n    # data: 1D tensor of token IDs\n    n = len(data)\n    \n    # Pick batch_size random starting indices (each between 0 and n-block_size)\n    ix = torch.randint(..., ...)\n    \n    # For each random start index, extract a window of block_size tokens → this is x\n    # Use list comprehension: data[i : i + block_size] for each i in ix\n    x = torch.stack([...])\n    \n    # For each random start index, extract the single next token → this is y\n    y = torch.stack([...])\n    \n    return x.to(device), y.to(device)"
          hint="torch.randint(low, high, size) picks random integers. Here: low=0, high=n-block_size, size=(batch_size,)."
          hintDetail="x = torch.stack([data[i : i + block_size] for i in ix]) creates a 2D tensor of shape (batch_size, block_size)."
          hintFull="ix = torch.randint(0, n - block_size, (batch_size,))\nx = torch.stack([data[i : i + block_size] for i in ix])\ny = torch.stack([data[i + block_size] for i in ix])"
          :checkFn="(code) => code.includes('randint') && code.includes('batch_size') && code.includes('block_size')"
          :solution="solutions.get_batch"
        />
      </TutorialSection>

      <!-- Section 3: Tokenizer -->
      <TutorialSection id="tokenizer" step="3" title="Byte Pair Encoding Tokenizer" subtitle="How real GPT models convert text into token IDs.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Character-level tokenization (from Section 1) is too slow for large vocabularies. Real GPT models use <strong>Byte Pair Encoding (BPE)</strong>, which learns to merge frequent character sequences into tokens. This gives a vocabulary of ~50,000 tokens instead of millions.
        </p>

        <DiagramTokenizer />

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          BPE works by iteratively merging the most frequent pair of adjacent tokens. Here's the algorithm:
        </p>

        <ol class="space-y-3 text-zinc-700 dark:text-zinc-300 list-decimal list-inside">
          <li>Start with character-level tokens</li>
          <li>Scan the corpus and count all adjacent pairs</li>
          <li>Merge the most frequent pair into a new token</li>
          <li>Repeat steps 2-3 for a fixed number of iterations</li>
          <li>The result is a vocabulary where common subwords are single tokens</li>
        </ol>

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Karpathy's implementation uses a simple BPE tokenizer. The key data structure is a dictionary mapping tuples of two tokens to their merge frequency.
        </p>

        <InteractiveCodeBlock
          description="Implement the BPE merge step: scan through each text block and replace every occurrence of a pair with a single merged token."
          explanation="BPE works by finding pairs of adjacent tokens and merging them. If 'a' and 'b' frequently appear together as 'ab', we merge them into one token."
          guide="result.append(merge_rule)  # replace the pair with the merged token\ni += 2  # skip both tokens since they're now one"
          placeholder="def merge(bpe, pairs, merge_rule):\n    '''Apply the most frequent merge to all text blocks.'''\n    new_pairs = {}\n    \n    for block in bpe:\n        result = []\n        i = 0\n        while i < len(block):\n            # Check if the current position matches the merge rule (two adjacent tokens)\n            if (i + 1 < len(block) and \n                block[i] == merge_rule[0] and \n                block[i+1] == merge_rule[1]):\n                # Found a match! Replace both tokens with the merged pair\n                result.append(...)\n                i += 2  # Skip both since they're now one token\n            else:\n                # No match — keep this token as-is\n                result.append(block[i])\n                i += 1\n        new_pairs[block] = result\n    \n    return new_pairs"
          hint="When you find the pair, append merge_rule itself (the tuple) to result. This represents the merged token."
          hintDetail="The key insight: result.append(merge_rule) replaces two separate tokens [a, b] with one combined token [ab]."
          hintFull="result.append(merge_rule) — this is the merged token representing the pair."
          :checkFn="(code) => code.includes('merge_rule') && code.includes('result') && code.includes('i +=')"
          :solution="solutions.bpe_merge"
        />
      </TutorialSection>

      <!-- Section 4: Embeddings -->
      <TutorialSection id="embeddings" step="4" title="Token Embeddings" subtitle="Converting discrete token IDs into continuous vectors.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Neural networks can't work with discrete token IDs directly. We need to map each token ID to a dense vector of floating-point numbers. This is done via an <strong>embedding lookup table</strong> — essentially a large 2D array where row <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">i</code> contains the embedding for token ID <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">i</code>.
        </p>

        <div class="bg-blue-50 dark:bg-black dark:border-blue-500 border-l-4 border-blue-400 p-4 my-4">
          <p class="text-sm text-blue-800 dark:text-blue-300">
            <strong>Shape:</strong> If vocabulary size is <code class="font-mono">vocab_size</code> and embedding dimension is <code class="font-mono">d_model</code>, the embedding table has shape <code class="font-mono">(vocab_size, d_model)</code>. For GPT-2: 50,257 × 768.
          </p>
        </div>

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          In PyTorch, this is a simple <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">nn.Embedding</code> layer. But under the hood, it's just indexed lookup: given input IDs of shape <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">(batch_size, seq_len)</code>, the output is <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">(batch_size, seq_len, d_model)</code>.
        </p>

        <InteractiveCodeBlock
          description="Look up embeddings by index. Given token IDs and an embedding matrix, return the vector for each token."
          explanation="An embedding matrix is like a lookup table. Row 0 contains the vector for token ID 0, row 1 for token ID 1, etc. PyTorch lets you index with a tensor of IDs to get all vectors at once."
          guide="embeddings = embedding_matrix[token_ids]"
          placeholder="import torch\n\ndef embed_lookup(token_ids, embedding_matrix):\n    '''\n    token_ids: (batch_size, seq_len) - integer tensor of token IDs\n    embedding_matrix: (vocab_size, d_model) - lookup table\n    Returns: (batch_size, seq_len, d_model) - dense vectors for each token\n    '''\n    # PyTorch lets you use a tensor of indices to index directly into a matrix\n    # Example: if token_ids = [[0, 1], [2, 3]], this returns rows 0,1,2,3\n    embeddings = ...\n    return embeddings"
          hint="Just use bracket indexing: embedding_matrix[token_ids]. PyTorch handles the rest."
          hintDetail="This is equivalent to: for each ID in token_ids, grab the corresponding row from embedding_matrix. PyTorch does this all at once efficiently."
          hintFull="embeddings = embedding_matrix[token_ids] — that's literally it, one line."
          :checkFn="(code) => code.includes('embedding') && (code.includes('[') || code.includes('index'))"
          :solution="solutions.embed_lookup"
        />

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-6">
          But wait — the embedding table doesn't know about token <em>positions</em>. "Hello world" and "world hello" would get the same embeddings. We need to add <strong>positional information</strong>.
        </p>
      </TutorialSection>

      <!-- Section 5: Positional Encoding -->
      <TutorialSection id="positional" step="5" title="Positional Encoding" subtitle="Adding position information to token embeddings.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Unlike RNNs, transformers process all tokens in parallel. There's no inherent notion of order. We must explicitly add positional information to the embeddings. GPT uses <strong>learned positional embeddings</strong> — a separate embedding table for positions.
        </p>

        <div class="bg-zinc-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
          // For each position pos and dimension d:\nif d % 2 == 0:\n    position_encoding[pos, d] = sin(pos / 10000^(d/d_model))\nelse:\n    position_encoding[pos, d] = cos(pos / 10000^((d-1)/d_model))
        </div>

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          This is the original positional encoding from the "Attention Is All You Need" paper. GPT actually uses learned embeddings instead of these sinusoidal encodings, but the math is instructive.
        </p>

        <InteractiveCodeBlock
          description="Implement sinusoidal positional encoding. Given a maximum sequence length and embedding dimension, compute the position encoding matrix."
          placeholder="import torch\nimport math\n\ndef positional_encoding(max_seq_len, d_model):\n    '''Compute sinusoidal positional encoding.'''\n    P = torch.zeros(..., ...)\n    \n    for pos in range(max_seq_len):\n        for d in range(d_model):\n            angle = ...\n            if d % 2 == 0:\n                P[pos, d] = math.sin(angle)\n            else:\n                P[pos, d] = math.cos(angle)\n    \n    return P"
          hint="The angle formula is: pos / (10000 ** (d / d_model)). Use the range function for both loops."
          :checkFn="(code) => code.includes('sin') && code.includes('cos') && code.includes('10000')"
          :solution="solutions.pos_encoding"
        />

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-6">
          In practice for GPT, we use learned positional embeddings instead. The code is simpler:
        </p>

        <InteractiveCodeBlock
          description="Write the learned positional embedding addition. Given token embeddings and a max sequence length, create positional embeddings and add them."
          placeholder="import torch.nn as nn\n\ndef add_positional_embeddings(token_embeddings, max_seq_len, d_model):\n    '''Add learned positional embeddings to token embeddings.'''\n    # Create learned positional embedding table\n    pos_embedding_table = nn.Embedding(..., ...)\n    \n    # Get positions: 0, 1, 2, ..., seq_len-1\n    seq_len = token_embeddings.size(1)\n    positions = torch.arange(...).unsqueeze(0).expand(...)\n    \n    # Look up and add\n    pos_embeddings = pos_embedding_table(positions)\n    return token_embeddings + pos_embeddings"
          hint="Positions tensor should have shape (1, seq_len) to broadcast with (batch_size, seq_len, d_model)."
          :checkFn="(code) => code.includes('Embedding') && code.includes('arange') && code.includes('+')"
          :solution="solutions.add_pos_embeddings"
        />
      </TutorialSection>

      <!-- Section 6: Causal Self-Attention -->
      <TutorialSection id="attention" step="6" title="Causal Self-Attention" subtitle="The core mechanism that lets GPT attend to previous tokens.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          This is the heart of GPT. <strong>Self-attention</strong> allows each token to attend to all other tokens in the sequence and aggregate information. <strong>Causal</strong> (or masked) self-attention ensures each token can only attend to itself and previous tokens — no looking ahead. This is what makes GPT autoregressive.
        </p>

        <DiagramAttention />

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The attention mechanism works in three steps:
        </p>

        <ol class="space-y-3 text-zinc-700 dark:text-zinc-300 list-decimal list-inside">
          <li><strong>Compute scores:</strong> For each query token, compute its dot product with every key token. This gives an <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">(seq_len, seq_len)</code> attention score matrix.</li>
          <li><strong>Mask and scale:</strong> Zero out the upper triangle (future tokens) and divide by <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">√d_k</code> to prevent softmax from producing extremely peaked distributions.</li>
          <li><strong>Weighted sum:</strong> Apply softmax to get weights, then use them to weight-value each value vector.</li>
        </ol>

        <div class="bg-blue-50 dark:bg-black dark:border-blue-500 border-l-4 border-blue-400 p-4 my-4">
          <p class="text-sm text-blue-800 dark:text-blue-300">
            <strong>Why causal masking?</strong> During training, we want the model to learn to predict the next token. If tokens could see future tokens, they'd "cheat" — the learned representations would be useless at inference time when future tokens don't exist yet.
          </p>
        </div>

        <InteractiveCodeBlock
          description="Implement causal self-attention. Given Q, K, V matrices, compute attention weights with masking and scaling."
          placeholder="import torch\n\ndef causal_attention(Q, K, V, dropout=None):\n    '''\n    Q, K, V: (batch_size, num_heads, seq_len, head_dim)\n    Returns: attention output and attention weights\n    '''\n    # Compute attention scores: Q @ K^T\n    scores = torch.matmul(..., ....transpose(-2, -1))\n    \n    # Scale by sqrt of key dimension\n    d_k = K.size(-1)\n    scores = scores / math.sqrt(d_k)\n    \n    # Create causal mask (lower triangle)\n    seq_len = Q.size(-2)\n    mask = torch.tril(torch.ones(..., ...)).to(scores.device)\n    \n    # Apply mask: set future positions to -inf\n    scores = scores.masked_fill(mask == 0, float('-inf'))\n    \n    # Softmax to get weights\n    attn_weights = torch.softmax(scores, dim=-1)\n    \n    # Apply dropout if specified\n    if dropout:\n        attn_weights = dropout(attn_weights)\n    \n    # Weighted sum of values\n    output = torch.matmul(..., ...)\n    \n    return output, attn_weights"
          hint="scores = Q @ K^T, then masked_fill with mask == 0, then softmax, then output = attn_weights @ V."
          :checkFn="(code) => code.includes('matmul') && code.includes('sqrt') && code.includes('tril') && code.includes('softmax')"
          :solution="solutions.causal_attention"
        />

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-6">
          Let's also implement the linear projections that create Q, K, V from the input. Each head has its own projection weights.
        </p>

        <InteractiveCodeBlock
          description="Write the projection function that creates Q, K, V from input embeddings using learned weight matrices."
          placeholder="def create_QKV(x, W_q, W_k, W_v):\n    '''\n    x: (batch_size, seq_len, d_model)\n    W_q, W_k, W_v: (d_model, d_model)\n    Returns: Q, K, V each of shape (batch_size, seq_len, d_model)\n    '''\n    Q = torch.matmul(..., ...)\n    K = torch.matmul(..., ...)\n    V = torch.matmul(..., ...)\n    return Q, K, V"
          hint="Simple matrix multiplication: x @ W_q, x @ W_k, x @ W_v."
          :checkFn="(code) => code.includes('matmul') && code.includes('W_q') && code.includes('W_k') && code.includes('W_v')"
          :solution="solutions.create_QKV"
        />
      </TutorialSection>

      <!-- Section 7: Multi-Head Attention -->
      <TutorialSection id="multihead" step="7" title="Multi-Head Attention" subtitle="Running multiple attention mechanisms in parallel.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Single-head attention is limiting — it can only focus on one pattern at a time. <strong>Multi-head attention</strong> splits the embedding dimension into multiple "heads," each learning different attention patterns. Think of it as having multiple "representations" of the same sequence, each focusing on different aspects.
        </p>

        <ol class="space-y-3 text-zinc-700 dark:text-zinc-300 list-decimal list-inside">
          <li>Split the embedding dimension <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">d_model</code> into <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">num_heads × head_dim</code></li>
          <li>Run causal attention independently on each head</li>
          <li>Concatenate all head outputs</li>
          <li>Project back to <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">d_model</code> with a final linear layer</li>
        </ol>

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          GPT-2 uses 12 heads for GPT-2 (small) and 12 heads for GPT-2 (medium), each with head dimension 64. The total must equal <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">d_model</code>.
        </p>

        <InteractiveCodeBlock
          description="Implement multi-head attention. Reshape the input to split into heads, run attention on each, then concatenate and project."
          placeholder="def multi_head_attention(x, num_heads, W_q, W_k, W_v, W_out):\n    '''\n    x: (batch_size, seq_len, d_model)\n    Returns: output of shape (batch_size, seq_len, d_model)\n    '''\n    batch_size, seq_len, d_model = x.shape\n    head_dim = d_model // num_heads\n    \n    # Reshape into (batch, seq, heads, head_dim) then transpose\n    x = x.view(..., ..., num_heads, head_dim).transpose(1, 2)\n    \n    # Split into Q, K, V using projected weights\n    Q = torch.matmul(x, W_q)\n    K = torch.matmul(x, W_k)\n    V = torch.matmul(x, W_v)\n    \n    # Run causal attention\n    attn_output, _ = causal_attention(Q, K, V)\n    \n    # Concatenate heads: (batch, heads, seq, head_dim) -> (batch, seq, d_model)\n    attn_output = attn_output.transpose(1, 2).contiguous()\n    attn_output = attn_output.view(batch_size, seq_len, d_model)\n    \n    # Final projection\n    output = torch.matmul(attn_output, W_out)\n    return output"
          hint="Use .view() to reshape and .transpose(1, 2) to move heads dimension. Don't forget .contiguous() before .view()."
          :checkFn="(code) => code.includes('view') && code.includes('transpose') && code.includes('causal_attention') && code.includes('contiguous')"
          :solution="solutions.multi_head_attention"
        />
      </TutorialSection>

      <!-- Section 8: Feed-Forward & Residual Connections -->
      <TutorialSection id="ffn" step="8" title="Feed-Forward & Residual Connections" subtitle="The second half of each transformer block.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          After attention, each token goes through a position-wise <strong>feed-forward network</strong> (FFN). This is a simple two-layer MLP applied independently to each position:
        </p>

        <div class="bg-zinc-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
          FFN(x) = ReLU(x @ W1) @ W2<br/>
          // where W1: (d_model, d_ff) and W2: (d_ff, d_model)<br/>
          // d_ff is typically 4 × d_model
        </div>

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Each sub-layer (attention and FFN) has a <strong>residual connection</strong> and <strong>layer normalization</strong>:
        </p>

        <div class="bg-zinc-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
          x = x + SubLayer(LayerNorm(x))<br/>
          // for each sub-layer: attention, then FFN
        </div>

        <div class="bg-blue-50 dark:bg-black dark:border-blue-500 border-l-4 border-blue-400 p-4 my-4">
          <p class="text-sm text-blue-800 dark:text-blue-300">
            <strong>Why residual connections?</strong> They allow gradients to flow through many layers without vanishing. Without them, training deep networks becomes extremely difficult. They also let the network learn identity functions easily.
          </p>
        </div>

        <InteractiveCodeBlock
          description="Implement a single transformer block: attention + residual + layer norm, then FFN + residual + layer norm."
          placeholder="import torch.nn as nn\n\ndef transformer_block(x, num_heads, W_q, W_k, W_v, W_out,\n                      W1, W2):\n    '''\n    x: (batch_size, seq_len, d_model)\n    Returns: output of same shape\n    '''\n    d_model = x.shape[-1]\n    \n    # --- Attention sub-layer ---\n    attn_out = multi_head_attention(x, num_heads, W_q, W_k, W_v, W_out)\n    x = x + attn_out          # residual connection\n    x = nn.LayerNorm(d_model)(x)  # layer normalization\n    \n    # --- Feed-Forward sub-layer ---\n    ffn = torch.matmul(nn.functional.relu(torch.matmul(x, W1)), W2)\n    x = x + ffn               # residual connection\n    x = nn.LayerNorm(d_model)(x)  # layer normalization\n    \n    return x"
          hint="Remember: residual is x + output, then LayerNorm. Do this for both attention and FFN sub-layers."
          :checkFn="(code) => code.includes('LayerNorm') && code.includes('+') && code.includes('relu') && code.includes('multi_head_attention')"
          :solution="solutions.transformer_block"
        />
      </TutorialSection>

      <!-- Section 9: The Full Model -->
      <TutorialSection id="model" step="9" title="Assembling the Full Model" subtitle="Putting all components together into one coherent model.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Now we assemble everything. The full GPT model flows like this:
        </p>

        <div class="bg-zinc-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto">
          Input IDs → Embedding → Positional Embedding<br/>
          → [Transformer Block × N]<br/>
          → LayerNorm → Linear (LM Head) → Softmax → Next Token Probabilities
        </div>

        <InteractiveCodeBlock
          description="Write the full forward pass of GPT. Given input token IDs, run them through the embedding, positional encoding, transformer blocks, and finally the output head."
          placeholder="class GPT(nn.Module):\n    def __init__(self, vocab_size, d_model, num_heads, num_layers, d_ff, max_seq_len):\n        super().__init__()\n        self.token_embeddings = nn.Embedding(vocab_size, d_model)\n        self.pos_embeddings = nn.Embedding(max_seq_len, d_model)\n        \n        # Transformer layers\n        self.layers = nn.ModuleList([\n            TransformerLayer(d_model, num_heads, d_ff) \n            for _ in range(num_layers)\n        ])\n        \n        self.layernorm = nn.LayerNorm(d_model)\n        self.lm_head = nn.Linear(d_model, vocab_size)\n    \n    def forward(self, x):\n        batch_size, seq_len = x.shape\n        \n        # Token + positional embeddings\n        tok_emb = self.token_embeddings(x)\n        pos_emb = self.pos_embeddings(torch.arange(seq_len).to(x.device))\n        x = tok_emb + pos_emb\n        \n        # Transformer blocks\n        for layer in self.layers:\n            x = ...\n        \n        # Final normalization and output head\n        x = self.layernorm(x)\n        logits = self.lm_head(x)\n        return logits"
          hint="Call each layer with x, then apply layernorm and lm_head at the end."
          :checkFn="(code) => code.includes('nn.Module') && code.includes('Embedding') && code.includes('forward') && code.includes('lm_head')"
          :solution="solutions.gpt_class"
        />
      </TutorialSection>

      <!-- Section 10: Training -->
      <TutorialSection id="training" step="10" title="Training Loop" subtitle="Teaching the model to predict the next token.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Training GPT is straightforward supervised learning. For each batch:
        </p>

        <ol class="space-y-3 text-zinc-700 dark:text-zinc-300 list-decimal list-inside">
          <li>Forward pass: get logits of shape <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">(batch_size, seq_len, vocab_size)</code></li>
          <li>Reshape for cross-entropy loss: <code class="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-sm">(batch_size × seq_len, vocab_size)</code></li>
          <li>Compute cross-entropy loss against target tokens</li>
          <li>Backward pass: compute gradients</li>
          <li>Update weights with optimizer (AdamW in Karpathy's case)</li>
        </ol>

        <div class="bg-blue-50 dark:bg-black dark:border-blue-500 border-l-4 border-blue-400 p-4 my-4">
          <p class="text-sm text-blue-800 dark:text-blue-300">
            <strong>Cross-entropy loss</strong> measures how far the predicted probability distribution is from the true distribution (one-hot encoded target). Lower loss means the model assigns higher probability to the correct next token.
          </p>
        </div>

        <InteractiveCodeBlock
          description="Write the training step: forward pass, loss computation, backward pass, and optimizer step."
          placeholder="def train_step(model, batch, optimizer, device):\n    inputs, targets = batch\n    \n    # Zero gradients from previous iteration\n    ...\n    \n    # Forward pass\n    logits = model(...)\n    \n    # Reshape for loss computation\n    logits_flat = logits.view(-1, ...)\n    targets_flat = targets.view(-1)\n    \n    # Compute cross-entropy loss\n    loss = nn.CrossEntropyLoss()(logits_flat, ...)\n    \n    # Backward pass\n    ...\n    \n    # Update parameters\n    ...\n    \n    return loss.item()"
          hint="optimizer.zero_grad(), model(inputs), loss.backward(), optimizer.step()."
          :checkFn="(code) => code.includes('zero_grad') && code.includes('backward') && code.includes('step') && code.includes('CrossEntropy')"
          :solution="solutions.train_step"
        />

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-6">
          Here's the full training loop with learning rate scheduling:
        </p>

        <InteractiveCodeBlock
          description="Write the training loop that iterates over epochs, batches, and includes a cosine or linear warmup learning rate schedule."
          placeholder="def train(model, data, epochs=50, batch_size=32, block_size=256):\n    optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)\n    device = 'cuda' if torch.cuda.is_available() else 'cpu'\n    model.to(device)\n    \n    for epoch in range(epochs):\n        for step in range(len(data) // batch_size):\n            # Get batch\n            x, y = get_batch(data, batch_size, block_size, device)\n            \n            # Learning rate schedule (linear warmup + decay)\n            lr = ...  # compute based on step and epoch\n            for param_group in optimizer.param_groups:\n                param_group['lr'] = lr\n            \n            loss = train_step(model, (x, y), optimizer, device)\n            \n            if step % 100 == 0:\n                print(f'Epoch {epoch}, Step {step}, Loss: {loss:.4f}')"
          hint="Warmup: lr = base_lr * (step / warmup_steps) for early steps, then decay."
          :checkFn="(code) => code.includes('AdamW') && code.includes('param_groups') && code.includes('lr') && code.includes('train_step')"
          :solution="solutions.train_loop"
        />
      </TutorialSection>

      <!-- Section 11: Inference -->
      <TutorialSection id="inference" step="11" title="Text Generation (Inference)" subtitle="Sampling text from the trained model.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          At inference time, we feed in a prompt and generate text one token at a time:
        </p>

        <ol class="space-y-3 text-zinc-700 dark:text-zinc-300 list-decimal list-inside">
          <li>Tokenize the prompt and convert to IDs</li>
          <li>Run forward pass to get logits for next token</li>
          <li>Take the logits at the last position, apply softmax to get probabilities</li>
          <li>Sample from the distribution (or take argmax for greedy)</li>
          <li>Append the sampled token to the sequence</li>
          <li>Repeat until we generate enough tokens or hit an end-of-sequence token</li>
        </ol>

        <InteractiveCodeBlock
          description="Write the text generation function. Given a model and a prompt, generate new text by sampling one token at a time."
          placeholder="def generate_text(model, tokenizer, prompt, max_new_tokens=50, temperature=1.0):\n    # Tokenize prompt\n    context = tokenizer.encode(prompt)\n    \n    for _ in range(max_new_tokens):\n        # Crop context to block size\n        context_cond = context[-...:]\n        \n        # Get logits\n        x = torch.tensor([context_cond]).to(device)\n        logits = model(x)\n        \n        # Get last position logits and apply temperature\n        logits = logits[0, -1, :] / ...\n        \n        # Apply softmax to get probabilities\n        probs = torch.softmax(..., dim=-1)\n        \n        # Sample from distribution\n        next_token = torch.multinomial(..., num_samples=1).item()\n        \n        # Append to context\n        context.append(...)\n    \n    return tokenizer.decode(context)"
          hint="temperature controls randomness: lower = more conservative. Use logits[0, -1, :] for last position."
          :checkFn="(code) => code.includes('softmax') && code.includes('multinomial') && code.includes('temperature') && code.includes('.item()')"
          :solution="solutions.generate_text"
        />

        <div class="bg-blue-50 dark:bg-black dark:border-blue-500 border-l-4 border-blue-400 p-4 my-4">
          <p class="text-sm text-blue-800 dark:text-blue-300">
            <strong>Temperature</strong> controls the randomness of sampling. At temperature = 0, you always get the most likely token (greedy decoding). At higher temperatures, you get more diverse but potentially less coherent output. Karpathy typically uses temperature around 0.8 for creative text generation.
          </p>
        </div>

        <InteractiveCodeBlock
          description="Write a greedy decoding variant that always picks the highest-probability token (temperature = 0)."
          placeholder="def generate_greedy(model, tokenizer, prompt, max_new_tokens=50):\n    context = tokenizer.encode(prompt)\n    \n    for _ in range(max_new_tokens):\n        context_cond = context[-block_size:]\n        x = torch.tensor([context_cond]).to(device)\n        logits = model(x)\n        \n        # Greedy: pick the token with highest logit\n        next_token = torch.argmax(logits[0, -1, :]).item()\n        context.append(next_token)\n    \n    return tokenizer.decode(context)"
          hint="Use torch.argmax() on the last position logits instead of multinomial sampling."
          :checkFn="(code) => code.includes('argmax') && code.includes('tokenizer') && code.includes('model')"
          :solution="solutions.generate_greedy"
        />
      </TutorialSection>

      <!-- Section 12: Summary -->
      <TutorialSection id="summary" step="12" title="What We Built" subtitle="Recap of the complete GPT architecture.">
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Congratulations! You've built a complete GPT model from scratch. Let's recap all the components:
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div class="bg-zinc-50 dark:bg-black rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h3 class="font-semibold text-zinc-900 dark:text-white mb-2">1. Tokenizer</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Converts raw text → token IDs using BPE or character-level encoding.</p>
          </div>
          <div class="bg-zinc-50 dark:bg-black rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h3 class="font-semibold text-zinc-900 dark:text-white mb-2">2. Embeddings</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Looks up dense vectors for each token ID from an embedding table.</p>
          </div>
          <div class="bg-zinc-50 dark:bg-black rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h3 class="font-semibold text-zinc-900 dark:text-white mb-2">3. Positional Encoding</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Adds position information so the model knows token order.</p>
          </div>
          <div class="bg-zinc-50 dark:bg-black rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h3 class="font-semibold text-zinc-900 dark:text-white mb-2">4. Multi-Head Attention</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Allows each token to attend to all previous tokens in parallel.</p>
          </div>
          <div class="bg-zinc-50 dark:bg-black rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h3 class="font-semibold text-zinc-900 dark:text-white mb-2">5. Feed-Forward Network</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Two-layer MLP processed independently at each position.</p>
          </div>
          <div class="bg-zinc-50 dark:bg-black rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h3 class="font-semibold text-zinc-900 dark:text-white mb-2">6. Residual + LayerNorm</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Stabilizes training and allows gradient flow through deep networks.</p>
          </div>
          <div class="bg-zinc-50 dark:bg-black rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h3 class="font-semibold text-zinc-900 dark:text-white mb-2">7. LM Head</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Projects final hidden states to vocabulary-sized logits.</p>
          </div>
          <div class="bg-zinc-50 dark:bg-black rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h3 class="font-semibold text-zinc-900 dark:text-white mb-2">8. Sampling</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Samples from softmax probabilities to generate new text.</p>
          </div>
        </div>

        <DiagramTransformer />

        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The key takeaway: despite their impressive capabilities, GPT models are fundamentally simple. They're just a stack of matrix multiplications with attention mechanisms, trained on massive text corpora. The power comes from scale — more data, more parameters, more compute — not from magical new ideas.
        </p>

        <div class="bg-orange-50 dark:bg-black dark:border-orange-500 border-l-4 border-orange-400 p-4 my-6">
          <p class="text-sm text-orange-800 dark:text-orange-300">
            <strong>Next steps:</strong> Try training the model on a small corpus (like a book or Wikipedia articles). Experiment with different hyperparameters: d_model, num_heads, num_layers, learning rate. See how the quality of generated text scales with model size and training data. The full code from Karpathy's series is available at <a href="https://github.com/karpathy/llm.c" target="_blank" rel="noopener" class="text-orange-600 hover:text-orange-700 underline">github.com/karpathy/llm.c</a>.
          </p>
        </div>

        <InteractiveCodeBlock
          description="Final exercise: Write a summary function that computes the model's parameters, layers, and approximate memory footprint."
          placeholder="def model_summary(vocab_size, d_model, num_heads, num_layers, d_ff):\n    '''Estimate total parameters and memory requirements.'''\n    \n    # Embedding parameters\n    token_emb = vocab_size * d_model\n    pos_emb = ...\n    \n    # Transformer layer parameters (per layer)\n    # QKV projections: 3 × d_model × d_model\n    qkv = 3 * d_model * d_model\n    # Output projection: d_model × d_model\n    attn_out = d_model * d_model\n    # FFN: d_model × d_ff + d_ff × d_model\n    ffn = d_model * d_ff + d_ff * d_model\n    layer_params = qkv + attn_out + ffn\n    \n    # Total parameters\n    total = token_emb + pos_emb + ...\n    \n    # Approximate memory (float32 = 4 bytes)\n    memory_gb = total * 4 / (1024**3)\n    \n    return {\n        'total_params': total,\n        'memory_gb': round(memory_gb, 2),\n        'layers': num_layers\n    }"
          hint="Total transformer params = layer_params × num_layers + lm_head (d_model × vocab_size)."
          :checkFn="(code) => code.includes('d_model') && code.includes('vocab_size') && code.includes('num_layers')"
          :solution="solutions.model_summary"
        />
      </TutorialSection>
    </div>

    <!-- Back to top -->
    <div class="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
      <a href="#" class="text-sm text-orange-500 hover:text-orange-600 font-medium inline-flex items-center gap-1">
        Back to top ↑
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';

const sections = [
  { id: 'intro', label: 'What is GPT?' },
  { id: 'data', label: 'Training Data' },
  { id: 'tokenizer', label: 'BPE Tokenizer' },
  { id: 'embeddings', label: 'Embeddings' },
  { id: 'positional', label: 'Positional Encoding' },
  { id: 'attention', label: 'Self-Attention' },
  { id: 'multihead', label: 'Multi-Head Attention' },
  { id: 'ffn', label: 'Feed-Forward & Residual' },
  { id: 'model', label: 'Full Model' },
  { id: 'training', label: 'Training Loop' },
  { id: 'inference', label: 'Text Generation' },
  { id: 'summary', label: 'Summary' },
];

const activeSection = ref(sections[0].id);
const sidebarRef = ref<HTMLElement | null>(null);

// All solution and placeholder strings stored here to avoid template quoting issues
const solutions = {
  simple_tokenizer: `class SimpleTokenizer:
    def __init__(self, text):
        chars = sorted(list(set(text)))
        self.vocab = chars
        self.str2id = {ch: i for i, ch in enumerate(chars)}
        self.id2str = {i: ch for i, ch in enumerate(chars)}

    def encode(self, text):
        return [self.str2id[c] for c in text]

    def decode(self, ids):
        return "".join([self.id2str[i] for i in ids])`,

  create_training_data: `def create_training_data(tokens, block_size):
    X = []
    Y = []
    
    for i in range(len(tokens) - block_size):
        x = tokens[i : i + block_size]
        y = tokens[i + block_size]
        X.append(x)
        Y.append(y)
    
    return X, Y`,

  get_batch: `def get_batch(data, batch_size, block_size, device="cpu"):
    n = len(data)
    ix = torch.randint(0, n - block_size, (batch_size,))
    
    x = torch.stack([data[i : i + block_size] for i in ix])
    y = torch.stack([data[i + block_size] for i in ix])
    
    return x.to(device), y.to(device)`,

  bpe_merge: `def merge(bpe, pairs, merge_rule):
    new_pairs = {}
    
    for block in bpe:
        result = []
        i = 0
        while i < len(block):
            if (i + 1 < len(block) and 
                block[i] == merge_rule[0] and 
                block[i+1] == merge_rule[1]):
                result.append(merge_rule)
                i += 2
            else:
                result.append(block[i])
                i += 1
        new_pairs[block] = result
    
    return new_pairs`,

  embed_lookup: `def embed_lookup(token_ids, embedding_matrix):
    """
    token_ids: (batch_size, seq_len)
    embedding_matrix: (vocab_size, d_model)
    Returns: (batch_size, seq_len, d_model)
    """
    return embedding_matrix[token_ids]`,

  pos_encoding: `import math

def positional_encoding(max_seq_len, d_model):
    P = torch.zeros(max_seq_len, d_model)
    
    for pos in range(max_seq_len):
        for d in range(d_model):
            angle = pos / (10000 ** (d / d_model))
            if d % 2 == 0:
                P[pos, d] = math.sin(angle)
            else:
                P[pos, d] = math.cos(angle)
    
    return P`,

  add_pos_embeddings: `def add_positional_embeddings(token_embeddings, max_seq_len, d_model):
    pos_embedding_table = nn.Embedding(max_seq_len, d_model)
    
    seq_len = token_embeddings.size(1)
    positions = torch.arange(seq_len).unsqueeze(0).expand(token_embeddings.size(0), seq_len)
    
    pos_embeddings = pos_embedding_table(positions)
    return token_embeddings + pos_embeddings`,

  causal_attention: `def causal_attention(Q, K, V, dropout=None):
    """
    Q, K, V: (batch_size, num_heads, seq_len, head_dim)
    Returns: attention output and attention weights
    """
    # Compute attention scores
    scores = torch.matmul(Q, K.transpose(-2, -1))
    
    # Scale
    d_k = K.size(-1)
    scores = scores / math.sqrt(d_k)
    
    # Causal mask
    seq_len = Q.size(-2)
    mask = torch.tril(torch.ones(1, seq_len, seq_len)).to(scores.device)
    scores = scores.masked_fill(mask == 0, float('-inf'))
    
    # Softmax + dropout
    attn_weights = torch.softmax(scores, dim=-1)
    if dropout:
        attn_weights = dropout(attn_weights)
    
    # Weighted sum
    output = torch.matmul(attn_weights, V)
    
    return output, attn_weights`,

  create_QKV: `def create_QKV(x, W_q, W_k, W_v):
    """
    x: (batch_size, seq_len, d_model)
    Returns: Q, K, V each of shape (batch_size, seq_len, d_model)
    """
    Q = torch.matmul(x, W_q)
    K = torch.matmul(x, W_k)
    V = torch.matmul(x, W_v)
    return Q, K, V`,

  multi_head_attention: `def multi_head_attention(x, num_heads, W_q, W_k, W_v, W_out):
    batch_size, seq_len, d_model = x.shape
    head_dim = d_model // num_heads
    
    # Reshape: (batch, seq, heads, head_dim) -> (batch, heads, seq, head_dim)
    x = x.view(batch_size, seq_len, num_heads, head_dim).transpose(1, 2)
    
    # Q, K, V projections
    Q = torch.matmul(x, W_q)
    K = torch.matmul(x, W_k)
    V = torch.matmul(x, W_v)
    
    # Attention
    attn_output, _ = causal_attention(Q, K, V)
    
    # Concatenate heads
    attn_output = attn_output.transpose(1, 2).contiguous()
    attn_output = attn_output.view(batch_size, seq_len, d_model)
    
    # Final projection
    output = torch.matmul(attn_output, W_out)
    return output`,

  transformer_block: `def transformer_block(x, num_heads, W_q, W_k, W_v, W_out, W1, W2):
    """
    x: (batch_size, seq_len, d_model)
    Returns: output of same shape
    """
    d_model = x.shape[-1]
    
    # Attention sub-layer
    attn_out = multi_head_attention(x, num_heads, W_q, W_k, W_v, W_out)
    x = x + attn_out          # residual connection
    x = nn.LayerNorm(d_model)(x)  # layer normalization
    
    # Feed-Forward sub-layer
    ffn = torch.matmul(nn.functional.relu(torch.matmul(x, W1)), W2)
    x = x + ffn               # residual connection
    x = nn.LayerNorm(d_model)(x)  # layer normalization
    
    return x`,

  gpt_class: `class GPT(nn.Module):
    def __init__(self, vocab_size, d_model, num_heads, num_layers, d_ff, max_seq_len):
        super().__init__()
        self.token_embeddings = nn.Embedding(vocab_size, d_model)
        self.pos_embeddings = nn.Embedding(max_seq_len, d_model)
        
        self.layers = nn.ModuleList([
            TransformerLayer(d_model, num_heads, d_ff) 
            for _ in range(num_layers)
        ])
        
        self.layernorm = nn.LayerNorm(d_model)
        self.lm_head = nn.Linear(d_model, vocab_size)
    
    def forward(self, x):
        batch_size, seq_len = x.shape
        
        tok_emb = self.token_embeddings(x)
        pos_emb = self.pos_embeddings(torch.arange(seq_len).to(x.device))
        x = tok_emb + pos_emb
        
        for layer in self.layers:
            x = layer(x)
        
        x = self.layernorm(x)
        logits = self.lm_head(x)
        return logits`,

  train_step: `def train_step(model, batch, optimizer, device):
    inputs, targets = batch
    
    optimizer.zero_grad()
    
    logits = model(inputs)
    
    logits_flat = logits.view(-1, logits.size(-1))
    targets_flat = targets.view(-1)
    
    loss = nn.CrossEntropyLoss()(logits_flat, targets_flat)
    
    loss.backward()
    
    optimizer.step()
    
    return loss.item()`,

  train_loop: `def train(model, data, epochs=50, batch_size=32, block_size=256):
    optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)
    
    for epoch in range(epochs):
        for step in range(len(data) // batch_size):
            x, y = get_batch(data, batch_size, block_size, device)
            
            # Linear warmup
            warmup_steps = 100
            if step < warmup_steps:
                lr = 3e-4 * (step + 1) / warmup_steps
            else:
                lr = 3e-4 * 0.1 ** ((step - warmup_steps) / 5000)
            
            for param_group in optimizer.param_groups:
                param_group["lr"] = lr
            
            loss = train_step(model, (x, y), optimizer, device)
            
            if step % 100 == 0:
                print(f"Epoch {epoch}, Step {step}, Loss: {loss:.4f}")`,

  generate_text: `def generate_text(model, tokenizer, prompt, max_new_tokens=50, temperature=1.0):
    context = tokenizer.encode(prompt)
    
    for _ in range(max_new_tokens):
        context_cond = context[-block_size:]
        
        x = torch.tensor([context_cond]).to(device)
        logits = model(x)
        
        logits = logits[0, -1, :] / temperature
        probs = torch.softmax(logits, dim=-1)
        
        next_token = torch.multinomial(probs, num_samples=1).item()
        context.append(next_token)
    
    return tokenizer.decode(context)`,

  generate_greedy: `def generate_greedy(model, tokenizer, prompt, max_new_tokens=50):
    context = tokenizer.encode(prompt)
    
    for _ in range(max_new_tokens):
        context_cond = context[-block_size:]
        x = torch.tensor([context_cond]).to(device)
        logits = model(x)
        
        next_token = torch.argmax(logits[0, -1, :]).item()
        context.append(next_token)
    
    return tokenizer.decode(context)`,

  model_summary: `def model_summary(vocab_size, d_model, num_heads, num_layers, d_ff):
    """Estimate total parameters and memory requirements."""
    
    token_emb = vocab_size * d_model
    pos_emb = 256 * d_model  # max_seq_len = 256
    
    qkv = 3 * d_model * d_model
    attn_out = d_model * d_model
    ffn = d_model * d_ff + d_ff * d_model
    layer_params = qkv + attn_out + ffn
    
    total = token_emb + pos_emb + layer_params * num_layers + d_model * vocab_size
    memory_gb = total * 4 / (1024**3)
    
    return {
        "total_params": total,
        "memory_gb": round(memory_gb, 2),
        "layers": num_layers
    }`,
};

// Track which section is in view
onMounted(() => {
  const targets = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

  useIntersectionObserver(
    targets,
    ([{ isIntersecting }], el) => {
      if (isIntersecting && el) {
        activeSection.value = el.id;
      }
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' },
  );
});

// Smooth scroll for sidebar links
function onSectionClick(e: Event) {
  const link = (e.target as HTMLElement).closest('a');
  if (link) {
    e.preventDefault();
    const id = link.getAttribute('href')?.slice(1);
    const el = document.getElementById(id || '');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

onMounted(() => {
  sidebarRef.value?.addEventListener('click', onSectionClick);
});
</script>
