# Fix: Vue Template Parser Error - Attribute Name Cannot Contain Quotes

## Problem
`pages/tutorial/index.vue:84:54` — The `placeholder` attribute value is wrapped in double quotes but contains Python code with double quotes (`"".join(...)`), which breaks the Vue template parser.

```vue
<!-- Line 62-90: placeholder="..." contains "" inside, breaking Vue parser -->
<InteractiveCodeBlock
  placeholder="# Your task: Write a simple char-level tokenizer.
class SimpleTokenizer:
    ...
    def decode(self, ids):
        return "".join([self.id2str[i] for i in ids])"
  ...
/>
```

## Root Cause
Vue template attributes use `=` with quoted values. When the attribute value contains the same quote character used to delimit it, the parser treats the inner quote as the end of the attribute, causing a parse error.

## Solution
Move all `placeholder` attribute values into `<script setup>` variables using JavaScript template literals (backticks), then bind them with `:placeholder`. This is the same pattern already used for `:solution`.

## Changes to `pages/tutorial/index.vue`

### Step 1: Add placeholder variables after `const solutions = { ... }` (after line 832)

Add these 12 placeholder variables using template literals:

```typescript
// Placeholder strings for InteractiveCodeBlock components
const placeholder1 = `# Your task: Write a simple char-level tokenizer.
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
        return "".join([self.id2str[i] for i in ids])`;

const placeholder2 = `import torch

def create_training_data(tokens, block_size):
    X = []  # inputs (context windows)
    Y = []  # targets (next token after each window)
    
    # Loop through all positions where we can form a complete window
    for i in range(len(tokens) - block_size):
        # x = the context window: tokens from position i to i+block_size
        x = ...
        
        # y = the single token right after the window
        y = ...
        
        X.append(x)
        Y.append(y)
    
    return X, Y`;

const placeholder3 = `import torch

def get_batch(data, batch_size, block_size, device='cpu'):
    # data: 1D tensor of token IDs
    n = len(data)
    
    # Pick batch_size random starting indices (each between 0 and n-block_size)
    ix = torch.randint(..., ...)
    
    # For each random start index, extract a window of block_size tokens → this is x
    # Use list comprehension: data[i : i + block_size] for each i in ix
    x = torch.stack([...])
    
    # For each random start index, extract the single next token → this is y
    y = torch.stack([...])
    
    return x.to(device), y.to(device)`;

const placeholder4 = `def merge(bpe, pairs, merge_rule):
    '''Apply the most frequent merge to all text blocks.'''
    new_pairs = {}
    
    for block in bpe:
        result = []
        i = 0
        while i < len(block):
            # Check if the current position matches the merge rule (two adjacent tokens)
            if (i + 1 < len(block) and 
                block[i] == merge_rule[0] and 
                block[i+1] == merge_rule[1]):
                # Found a match! Replace both tokens with the merged pair
                result.append(...)
                i += 2  # Skip both since they're now one token
            else:
                # No match — keep this token as-is
                result.append(block[i])
                i += 1
        new_pairs[block] = result
    
    return new_pairs`;

const placeholder5 = `import torch

def embed_lookup(token_ids, embedding_matrix):
    '''
    token_ids: (batch_size, seq_len) - integer tensor of token IDs
    embedding_matrix: (vocab_size, d_model) - lookup table
    Returns: (batch_size, seq_len, d_model) - dense vectors for each token
    '''
    # PyTorch lets you use a tensor of indices to index directly into a matrix
    # Example: if token_ids = [[0, 1], [2, 3]], this returns rows 0,1,2,3
    embeddings = ...
    return embeddings`;

const placeholder6 = `import torch
import math

def positional_encoding(max_seq_len, d_model):
    '''Compute sinusoidal positional encoding.'''
    P = torch.zeros(..., ...)
    
    for pos in range(max_seq_len):
        for d in range(d_model):
            angle = ...
            if d % 2 == 0:
                P[pos, d] = math.sin(angle)
            else:
                P[pos, d] = math.cos(angle)
    
    return P`;

const placeholder7 = `import torch.nn as nn

def add_positional_embeddings(token_embeddings, max_seq_len, d_model):
    '''Add learned positional embeddings to token embeddings.'''
    # Create learned positional embedding table
    pos_embedding_table = nn.Embedding(..., ...)
    
    # Get positions: 0, 1, 2, ..., seq_len-1
    seq_len = token_embeddings.size(1)
    positions = torch.arange(...).unsqueeze(0).expand(...)
    
    # Look up and add
    pos_embeddings = pos_embedding_table(positions)
    return token_embeddings + pos_embeddings`;

const placeholder8 = `import torch

def causal_attention(Q, K, V, dropout=None):
    '''
    Q, K, V: (batch_size, num_heads, seq_len, head_dim)
    Returns: attention output and attention weights
    '''
    # Compute attention scores: Q @ K^T
    scores = torch.matmul(..., ....transpose(-2, -1))
    
    # Scale by sqrt of key dimension
    d_k = K.size(-1)
    scores = scores / math.sqrt(d_k)
    
    # Create causal mask (lower triangle)
    seq_len = Q.size(-2)
    mask = torch.tril(torch.ones(..., ...)).to(scores.device)
    
    # Apply mask: set future positions to -inf
    scores = scores.masked_fill(mask == 0, float('-inf'))
    
    # Softmax to get weights
    attn_weights = torch.softmax(scores, dim=-1)
    
    # Apply dropout if specified
    if dropout:
        attn_weights = dropout(attn_weights)
    
    # Weighted sum of values
    output = torch.matmul(..., ...)
    
    return output, attn_weights`;

const placeholder9 = `def create_QKV(x, W_q, W_k, W_v):
    '''
    x: (batch_size, seq_len, d_model)
    W_q, W_k, W_v: (d_model, d_model)
    Returns: Q, K, V each of shape (batch_size, seq_len, d_model)
    '''
    Q = torch.matmul(..., ...)
    K = torch.matmul(..., ...)
    V = torch.matmul(..., ...)
    return Q, K, V`;

const placeholder10 = `def multi_head_attention(x, num_heads, W_q, W_k, W_v, W_out):
    '''
    x: (batch_size, seq_len, d_model)
    Returns: output of shape (batch_size, seq_len, d_model)
    '''
    batch_size, seq_len, d_model = x.shape
    head_dim = d_model // num_heads
    
    # Reshape into (batch, seq, heads, head_dim) then transpose
    x = x.view(..., ..., num_heads, head_dim).transpose(1, 2)
    
    # Split into Q, K, V using projected weights
    Q = torch.matmul(x, W_q)
    K = torch.matmul(x, W_k)
    V = torch.matmul(x, W_v)
    
    # Run causal attention
    attn_output, _ = causal_attention(Q, K, V)
    
    # Concatenate heads: (batch, heads, seq, head_dim) -> (batch, seq, d_model)
    attn_output = attn_output.transpose(1, 2).contiguous()
    attn_output = attn_output.view(batch_size, seq_len, d_model)
    
    # Final projection
    output = torch.matmul(attn_output, W_out)
    return output`;

const placeholder11 = `import torch.nn as nn

def transformer_block(x, num_heads, W_q, W_k, W_v, W_out,
                      W1, W2):
    '''
    x: (batch_size, seq_len, d_model)
    Returns: output of same shape
    '''
    d_model = x.shape[-1]
    
    # --- Attention sub-layer ---
    attn_out = multi_head_attention(x, num_heads, W_q, W_k, W_v, W_out)
    x = x + attn_out          # residual connection
    x = nn.LayerNorm(d_model)(x)  # layer normalization
    
    # --- Feed-Forward sub-layer ---
    ffn = torch.matmul(nn.functional.relu(torch.matmul(x, W1)), W2)
    x = x + ffn               # residual connection
    x = nn.LayerNorm(d_model)(x)  # layer normalization
    
    return x`;

const placeholder12 = `class GPT(nn.Module):
    def __init__(self, vocab_size, d_model, num_heads, num_layers, d_ff, max_seq_len):
        super().__init__()
        self.token_embeddings = nn.Embedding(vocab_size, d_model)
        self.pos_embeddings = nn.Embedding(max_seq_len, d_model)
        
        # Transformer layers
        self.layers = nn.ModuleList([
            TransformerLayer(d_model, num_heads, d_ff) 
            for _ in range(num_layers)
        ])
        
        self.layernorm = nn.LayerNorm(d_model)
        self.lm_head = nn.Linear(d_model, vocab_size)
    
    def forward(self, x):
        batch_size, seq_len = x.shape
        
        # Token + positional embeddings
        tok_emb = self.token_embeddings(x)
        pos_emb = self.pos_embeddings(torch.arange(seq_len).to(x.device))
        x = tok_emb + pos_emb
        
        # Transformer blocks
        for layer in self.layers:
            x = ...
        
        # Final normalization and output head
        x = self.layernorm(x)
        logits = self.lm_head(x)
        return logits`;

const placeholder13 = `def train_step(model, batch, optimizer, device):
    inputs, targets = batch
    
    # Zero gradients from previous iteration
    ...
    
    # Forward pass
    logits = model(...)
    
    # Reshape for loss computation
    logits_flat = logits.view(-1, ...)
    targets_flat = targets.view(-1)
    
    # Compute cross-entropy loss
    loss = nn.CrossEntropyLoss()(logits_flat, ...)
    
    # Backward pass
    ...
    
    # Update parameters
    ...
    
    return loss.item()`;

const placeholder14 = `def train(model, data, epochs=50, batch_size=32, block_size=256):
    optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    model.to(device)
    
    for epoch in range(epochs):
        for step in range(len(data) // batch_size):
            # Get batch
            x, y = get_batch(data, batch_size, block_size, device)
            
            # Learning rate schedule (linear warmup + decay)
            lr = ...  # compute based on step and epoch
            for param_group in optimizer.param_groups:
                param_group['lr'] = lr
            
            loss = train_step(model, (x, y), optimizer, device)
            
            if step % 100 == 0:
                print(f'Epoch {epoch}, Step {step}, Loss: {loss:.4f}')`;

const placeholder15 = `def generate_text(model, tokenizer, prompt, max_new_tokens=50, temperature=1.0):
    # Tokenize prompt
    context = tokenizer.encode(prompt)
    
    for _ in range(max_new_tokens):
        # Crop context to block size
        context_cond = context[-...:]
        
        # Get logits
        x = torch.tensor([context_cond]).to(device)
        logits = model(x)
        
        # Get last position logits and apply temperature
        logits = logits[0, -1, :] / ...
        
        # Apply softmax to get probabilities
        probs = torch.softmax(..., dim=-1)
        
        # Sample from distribution
        next_token = torch.multinomial(..., num_samples=1).item()
        
        # Append to context
        context.append(...)
    
    return tokenizer.decode(context)`;

const placeholder16 = `def generate_greedy(model, tokenizer, prompt, max_new_tokens=50):
    context = tokenizer.encode(prompt)
    
    for _ in range(max_new_tokens):
        context_cond = context[-block_size:]
        x = torch.tensor([context_cond]).to(device)
        logits = model(x)
        
        # Greedy: pick the token with highest logit
        next_token = torch.argmax(logits[0, -1, :]).item()
        context.append(next_token)
    
    return tokenizer.decode(context)`;

const placeholder17 = `def model_summary(vocab_size, d_model, num_heads, num_layers, d_ff):
    '''Estimate total parameters and memory requirements.'''
    
    # Embedding parameters
    token_emb = vocab_size * d_model
    pos_emb = ...
    
    # Transformer layer parameters (per layer)
    # QKV projections: 3 × d_model × d_model
    qkv = 3 * d_model * d_model
    # Output projection: d_model × d_model
    attn_out = d_model * d_model
    # FFN: d_model × d_ff + d_ff × d_model
    ffn = d_model * d_ff + d_ff * d_model
    layer_params = qkv + attn_out + ffn
    
    # Total parameters
    total = token_emb + pos_emb + ...
    
    # Approximate memory (float32 = 4 bytes)
    memory_gb = total * 4 / (1024**3)
    
    return {
        'total_params': total,
        'memory_gb': round(memory_gb, 2),
        'layers': num_layers
    }`;
```

### Step 2: Replace all `placeholder="..."` with `:placeholder="placeholderN"` in the template

There are 17 `InteractiveCodeBlock` components. Replace each `placeholder="..."` block with `:placeholder="placeholderN"`:

| Component | Line | Variable |
|-----------|------|----------|
| Section 1 (tokenizer) | 66-84 | `:placeholder="placeholder1"` |
| Section 2 (training data) | 117 | `:placeholder="placeholder2"` |
| Section 2 (get_batch) | 133 | `:placeholder="placeholder3"` |
| Section 3 (BPE merge) | 170 | `:placeholder="placeholder4"` |
| Section 4 (embed lookup) | 199 | `:placeholder="placeholder5"` |
| Section 5 (pos encoding) | 228 | `:placeholder="placeholder6"` |
| Section 5 (learned pos emb) | 240 | `:placeholder="placeholder7"` |
| Section 6 (causal attention) | 273 | `:placeholder="placeholder8"` |
| Section 6 (create QKV) | 285 | `:placeholder="placeholder9"` |
| Section 7 (multi-head) | 311 | `:placeholder="placeholder10"` |
| Section 8 (transformer block) | 347 | `:placeholder="placeholder11"` |
| Section 9 (GPT class) | 368 | `:placeholder="placeholder12"` |
| Section 10 (train step) | 397 | `:placeholder="placeholder13"` |
| Section 10 (train loop) | 409 | `:placeholder="placeholder14"` |
| Section 11 (generate text) | 433 | `:placeholder="placeholder15"` |
| Section 11 (generate greedy) | 447 | `:placeholder="placeholder16"` |
| Section 12 (model summary) | 509 | `:placeholder="placeholder17"` |

### Step 3: Update the comment on line 547

Change from:
```typescript
// All solution strings stored here to avoid template quoting issues
```
To:
```typescript
// All solution and placeholder strings stored here to avoid template quoting issues
```

## Why This Works
- Template literals (backticks) can contain any characters including single/double quotes without escaping
- `:placeholder` (shorthand for `v-bind:placeholder`) tells Vue to evaluate the value as JavaScript, not as a string literal in the template
- This is the exact same pattern already used for `:solution="solutions.simple_tokenizer"` on line 89
