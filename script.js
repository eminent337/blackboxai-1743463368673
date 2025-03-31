document.addEventListener('DOMContentLoaded', function() {
    // Scroll to the specified section if hash exists
    const hash = window.location.hash;
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Run button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('run-btn') || e.target.closest('.run-btn')) {
            const cell = e.target.closest('.code-cell');
            if (cell) {
                const textarea = cell.querySelector('textarea');
                const output = cell.querySelector('.output-area');
                
                // Simulate code execution
                try {
                    const code = textarea.value;
                    const result = simulateExecution(code);
                    output.innerHTML = `<pre class="text-sm">${result}</pre>`;
                    output.classList.remove('hidden');
                } catch (error) {
                    output.innerHTML = `<pre class="text-sm text-red-500">Error: ${error.message}</pre>`;
                    output.classList.remove('hidden');
                }
            }
        }
    });

    // Enhanced code execution simulation
    function simulateExecution(code) {
        if (code.trim() === '') return "No code to execute";
        
        // Handle print statements
        if (code.includes('print(')) {
            const prints = code.match(/print\((["'])(.*?)\1\)/g);
            if (prints) {
                return prints.map(p => 
                    p.match(/print\((["'])(.*?)\1\)/)[2]
                ).join('\n');
            }
        }
        
        // Handle imports
        if (code.includes('import ')) {
            const imports = code.match(/import\s+([^\s;]+)/g);
            return imports ? `Imported: ${imports.join(', ')}` : "Import processed";
        }
        
        // Handle variable assignments
        if (code.includes('=')) {
            const vars = code.match(/(\w+)\s*=\s*(.+?)(?:\s|;|$)/);
            if (vars) return `Variable ${vars[1]} assigned`;
        }
        
        // Handle basic operations
        if (code.match(/[\+\-\*\/]/)) {
            return "Operation executed (simulated)";
        }
        
        return "Code executed (simulated)";
    }

    // Add new cell functionality
    document.querySelectorAll('[data-action="add-cell"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const notebook = document.getElementById('notebook-container');
            const newCell = document.createElement('div');
            newCell.className = 'mb-6 code-cell bg-white rounded-lg shadow-sm p-4';
            newCell.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <span class="text-xs text-gray-500">Code Cell</span>
                    <button class="run-btn px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                        <i class="fas fa-play mr-1"></i> Run
                    </button>
                </div>
                <textarea class="w-full font-mono text-sm p-2 border border-gray-200 rounded" rows="5"></textarea>
                <div class="output-area mt-2 p-3 rounded hidden"></div>
            `;
            notebook.appendChild(newCell);
        });
    });
});