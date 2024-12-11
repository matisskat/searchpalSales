document.addEventListener('DOMContentLoaded', function() {
    // Mock data - in real app, this would come from the server
    let toolData = {
        name: "Sample Tool Name",
        link: "https://example.com/tool",
        description: "This is a comprehensive tool that helps developers streamline their workflow. It provides powerful features for automation, collaboration, and code quality improvement. Perfect for teams of all sizes looking to enhance their development process.",
        features: [
            {
                icon: "⚡",
                title: "Fast Integration",
                description: "Quick and easy setup process"
            },
            {
                icon: "🔒",
                title: "Secure",
                description: "Enterprise-grade security"
            },
            {
                icon: "📊",
                title: "Analytics",
                description: "Detailed insights and reporting"
            },
            {
                icon: "🔄",
                title: "Automation",
                description: "Streamlined workflows"
            }
        ],
        pricing: {
            starter: {
                price: "$29/mo",
                features: ["Basic features", "2 users", "5GB storage"]
            },
            professional: {
                price: "$99/mo",
                features: ["Advanced features", "10 users", "50GB storage"]
            },
            enterprise: {
                price: "Custom",
                features: ["All features", "Unlimited users", "Custom storage"]
            }
        },
        pros: [
            "Easy to use interface",
            "Comprehensive documentation",
            "Excellent customer support",
            "Regular updates"
        ],
        cons: [
            "Limited free tier",
            "Learning curve for advanced features",
            "Some features require paid plans"
        ]
    };

    // Elements
    const modal = document.getElementById('editModal');
    const editButton = document.getElementById('editButton');
    const closeBtn = document.querySelector('.close');
    const editForm = document.getElementById('editToolForm');

    // Initialize preview with mock data
    updatePreview(toolData);

    // Edit button opens modal
    editButton.addEventListener('click', () => {
        modal.style.display = 'block';
        populateEditForm(toolData);
    });

    // Close modal when clicking (X)
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather all form data
        const features = [];
        document.querySelectorAll('.feature-edit').forEach(feature => {
            features.push({
                icon: feature.querySelector('input[name="featureIcon"]').value,
                title: feature.querySelector('input[name="featureTitle"]').value,
                description: feature.querySelector('input[name="featureDescription"]').value
            });
        });

        const pricing = {
            starter: {
                price: document.getElementById('starterPrice').value,
                features: Array.from(document.querySelectorAll('#starterFeatures .feature-input input')).map(input => input.value)
            },
            professional: {
                price: document.getElementById('professionalPrice').value,
                features: Array.from(document.querySelectorAll('#professionalFeatures .feature-input input')).map(input => input.value)
            },
            enterprise: {
                price: document.getElementById('enterprisePrice').value,
                features: Array.from(document.querySelectorAll('#enterpriseFeatures .feature-input input')).map(input => input.value)
            }
        };

        const pros = Array.from(document.querySelectorAll('#prosContainer .pro-input input')).map(input => input.value);
        const cons = Array.from(document.querySelectorAll('#consContainer .con-input input')).map(input => input.value);

        toolData = {
            name: document.getElementById('editToolName').value,
            link: document.getElementById('editToolLink').value,
            description: document.getElementById('editDescription').value,
            features,
            pricing,
            pros,
            cons
        };

        updatePreview(toolData);
        modal.style.display = 'none';

        // Show a success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4caf50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideUp 0.3s ease-out;
        `;
        successMessage.textContent = 'Changes saved successfully!';
        document.body.appendChild(successMessage);

        // Remove the message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideDown 0.3s ease-out';
            setTimeout(() => document.body.removeChild(successMessage), 300);
        }, 3000);
    });

    // Feature management
    window.addFeature = function() {
        const container = document.getElementById('featuresContainer');
        const featureDiv = document.createElement('div');
        featureDiv.className = 'feature-edit';
        featureDiv.innerHTML = `
            <input type="text" name="featureIcon" placeholder="Icon (e.g., ⚡)" required>
            <div>
                <input type="text" name="featureTitle" placeholder="Feature Title" required style="width: 100%">
                <input type="text" name="featureDescription" placeholder="Feature Description" required style="width: 100%">
            </div>
            <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
        `;
        container.appendChild(featureDiv);
    };

    // Pricing feature management
    window.addPricingFeature = function(tier) {
        const container = document.getElementById(`${tier}Features`);
        const featureDiv = document.createElement('div');
        featureDiv.className = 'feature-input';
        featureDiv.innerHTML = `
            <input type="text" placeholder="Feature description" required style="flex: 1">
            <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
        `;
        container.appendChild(featureDiv);
    };

    // Pros & Cons management
    window.addPro = function() {
        const container = document.getElementById('prosContainer');
        const proDiv = document.createElement('div');
        proDiv.className = 'pro-input';
        proDiv.innerHTML = `
            <input type="text" placeholder="Add a pro" required style="flex: 1">
            <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
        `;
        container.appendChild(proDiv);
    };

    window.addCon = function() {
        const container = document.getElementById('consContainer');
        const conDiv = document.createElement('div');
        conDiv.className = 'con-input';
        conDiv.innerHTML = `
            <input type="text" placeholder="Add a con" required style="flex: 1">
            <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
        `;
        container.appendChild(conDiv);
    };

    // Helper functions
    function updatePreview(data) {
        // Update basic info
        document.getElementById('previewToolName').textContent = data.name;
        const linkElement = document.querySelector('#previewToolLink a');
        linkElement.href = data.link;
        linkElement.textContent = data.link;
        document.getElementById('previewDescription').textContent = data.description;

        // Update features
        if (data.features) {
            const featureItems = document.querySelectorAll('.feature-item');
            data.features.forEach((feature, index) => {
                if (featureItems[index]) {
                    const item = featureItems[index];
                    item.querySelector('.feature-icon').textContent = feature.icon;
                    item.querySelector('strong').textContent = feature.title;
                    item.querySelector('p').textContent = feature.description;
                }
            });
        }

        // Update pricing
        if (data.pricing) {
            const pricingTiers = document.querySelectorAll('.pricing-tier');
            const tiers = ['starter', 'professional', 'enterprise'];
            tiers.forEach((tier, index) => {
                if (pricingTiers[index] && data.pricing[tier]) {
                    const tierElement = pricingTiers[index];
                    tierElement.querySelector('.tier-price').textContent = data.pricing[tier].price;
                    const features = tierElement.querySelectorAll('li');
                    data.pricing[tier].features.forEach((feature, featureIndex) => {
                        if (features[featureIndex]) {
                            features[featureIndex].textContent = feature;
                        }
                    });
                }
            });
        }

        // Update pros and cons
        if (data.pros) {
            const prosElement = document.querySelector('.pros ul');
            if (prosElement) {
                prosElement.innerHTML = data.pros.map(pro => `<li>${pro}</li>`).join('');
            }
        }
        if (data.cons) {
            const consElement = document.querySelector('.cons ul');
            if (consElement) {
                consElement.innerHTML = data.cons.map(con => `<li>${con}</li>`).join('');
            }
        }
    }

    function populateEditForm(data) {
        // Basic info
        document.getElementById('editToolName').value = data.name;
        document.getElementById('editToolLink').value = data.link;
        document.getElementById('editDescription').value = data.description;

        // Features
        const featuresContainer = document.getElementById('featuresContainer');
        featuresContainer.innerHTML = '';
        data.features.forEach(feature => {
            const featureDiv = document.createElement('div');
            featureDiv.className = 'feature-edit';
            featureDiv.innerHTML = `
                <input type="text" name="featureIcon" value="${feature.icon}" placeholder="Icon (e.g., ⚡)" required>
                <div>
                    <input type="text" name="featureTitle" value="${feature.title}" placeholder="Feature Title" required style="width: 100%">
                    <input type="text" name="featureDescription" value="${feature.description}" placeholder="Feature Description" required style="width: 100%">
                </div>
                <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
            `;
            featuresContainer.appendChild(featureDiv);
        });

        // Pricing
        ['starter', 'professional', 'enterprise'].forEach(tier => {
            document.getElementById(`${tier}Price`).value = data.pricing[tier].price;
            const featuresContainer = document.getElementById(`${tier}Features`);
            featuresContainer.innerHTML = '';
            data.pricing[tier].features.forEach(feature => {
                const featureDiv = document.createElement('div');
                featureDiv.className = 'feature-input';
                featureDiv.innerHTML = `
                    <input type="text" value="${feature}" placeholder="Feature description" required style="flex: 1">
                    <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
                `;
                featuresContainer.appendChild(featureDiv);
            });
        });

        // Pros
        const prosContainer = document.getElementById('prosContainer');
        prosContainer.innerHTML = '';
        data.pros.forEach(pro => {
            const proDiv = document.createElement('div');
            proDiv.className = 'pro-input';
            proDiv.innerHTML = `
                <input type="text" value="${pro}" placeholder="Add a pro" required style="flex: 1">
                <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
            `;
            prosContainer.appendChild(proDiv);
        });

        // Cons
        const consContainer = document.getElementById('consContainer');
        consContainer.innerHTML = '';
        data.cons.forEach(con => {
            const conDiv = document.createElement('div');
            conDiv.className = 'con-input';
            conDiv.innerHTML = `
                <input type="text" value="${con}" placeholder="Add a con" required style="flex: 1">
                <button type="button" class="remove-btn" onclick="this.parentElement.remove()">×</button>
            `;
            consContainer.appendChild(conDiv);
        });
    }

    // Add styles for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { transform: translate(-50%, 100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes slideDown {
            from { transform: translate(-50%, 0); opacity: 1; }
            to { transform: translate(-50%, 100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}); 