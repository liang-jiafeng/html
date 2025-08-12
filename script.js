// AI提案助手系统核心功能
class AIProposalAssistant {
    constructor() {
        this.currentCategory = 'innovation';
        this.proposals = this.initializeProposals();
        this.recommendations = this.initializeRecommendations();
        this.chatHistory = [];
        this.init();
    }

    // 初始化系统
    init() {
        this.bindEvents();
        this.renderProposals();
        this.renderRecommendations();
        this.loadChatHistory();
    }

    // 绑定事件监听器
    bindEvents() {
        // 分类切换
        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.switchCategory(e.currentTarget.dataset.category);
            });
        });

        // 聊天功能
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        sendBtn.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // 排序功能
        document.getElementById('sort-select').addEventListener('change', (e) => {
            this.sortProposals(e.target.value);
        });

        // 模态框关闭
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // 点击模态框外部关闭
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // 优质提案点击
        document.querySelectorAll('.quality-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.showQualityProposals(index);
            });
        });
    }

    // 初始化提案数据
    initializeProposals() {
        const categories = {
            innovation: [
                {
                    id: 1,
                    title: '基于AI的智能客服系统升级',
                    category: '技术创新',
                    description: '利用最新的自然语言处理技术，提升客服系统的智能化水平，提高客户满意度。',
                    rating: 4.8,
                    date: '2024-01-15',
                    author: '张工程师',
                    department: '技术部',
                    status: '已实施',
                    impact: '高',
                    cost: '中等'
                },
                {
                    id: 2,
                    title: '区块链技术在供应链管理中的应用',
                    category: '技术创新',
                    description: '通过区块链技术实现供应链全程可追溯，提高透明度和安全性。',
                    rating: 4.6,
                    date: '2024-01-10',
                    author: '李经理',
                    department: '运营部',
                    status: '评估中',
                    impact: '高',
                    cost: '高'
                },
                {
                    id: 3,
                    title: '物联网设备统一管理平台',
                    category: '技术创新',
                    description: '建立统一的IoT设备管理平台，实现设备监控、维护和数据分析的一体化。',
                    rating: 4.7,
                    date: '2024-01-08',
                    author: '王主管',
                    department: '设备部',
                    status: '开发中',
                    impact: '中',
                    cost: '中等'
                }
            ],
            process: [
                {
                    id: 4,
                    title: '生产流程数字化改造',
                    category: '流程优化',
                    description: '将传统纸质流程转换为数字化流程，提高工作效率和准确性。',
                    rating: 4.5,
                    date: '2024-01-12',
                    author: '陈主任',
                    department: '生产部',
                    status: '已实施',
                    impact: '中',
                    cost: '低'
                },
                {
                    id: 5,
                    title: '采购审批流程优化',
                    category: '流程优化',
                    description: '简化采购审批流程，缩短审批时间，提高采购效率。',
                    rating: 4.3,
                    date: '2024-01-05',
                    author: '刘采购',
                    department: '采购部',
                    status: '评估中',
                    impact: '中',
                    cost: '低'
                }
            ],
            management: [
                {
                    id: 6,
                    title: '员工绩效评估体系改革',
                    category: '管理改进',
                    description: '建立科学的绩效评估体系，提高员工工作积极性和企业竞争力。',
                    rating: 4.4,
                    date: '2024-01-14',
                    author: '赵总监',
                    department: '人力资源部',
                    status: '计划中',
                    impact: '高',
                    cost: '低'
                }
            ],
            customer: [
                {
                    id: 7,
                    title: '客户反馈系统升级',
                    category: '客户服务',
                    description: '建立多渠道客户反馈收集系统，提高客户服务质量和响应速度。',
                    rating: 4.6,
                    date: '2024-01-11',
                    author: '孙客服',
                    department: '客服部',
                    status: '开发中',
                    impact: '中',
                    cost: '中等'
                }
            ],
            quality: [
                {
                    id: 8,
                    title: '质量管理体系认证升级',
                    category: '质量提升',
                    description: '升级质量管理体系，获得更高级别的质量认证，提升企业形象。',
                    rating: 4.7,
                    date: '2024-01-09',
                    author: '周质量',
                    department: '质量部',
                    status: '进行中',
                    impact: '高',
                    cost: '中等'
                }
            ],
            cost: [
                {
                    id: 9,
                    title: '能源消耗优化方案',
                    category: '成本控制',
                    description: '通过技术改造和流程优化，降低企业能源消耗，减少运营成本。',
                    rating: 4.5,
                    date: '2024-01-07',
                    author: '吴节能',
                    department: '工程部',
                    status: '评估中',
                    impact: '中',
                    cost: '中等'
                }
            ],
            safety: [
                {
                    id: 10,
                    title: '安全生产管理系统升级',
                    category: '安全环保',
                    description: '升级安全生产管理系统，提高安全管理水平，确保员工安全。',
                    rating: 4.8,
                    date: '2024-01-06',
                    author: '郑安全',
                    department: '安全部',
                    status: '已实施',
                    impact: '高',
                    cost: '中等'
                }
            ]
        };

        return categories;
    }

    // 初始化推荐提案
    initializeRecommendations() {
        return [
            {
                id: 11,
                title: '5G技术在工业互联网中的应用',
                category: '技术创新',
                rating: 4.9,
                reason: '基于您的浏览历史推荐'
            },
            {
                id: 12,
                title: '绿色制造工艺改进',
                category: '安全环保',
                rating: 4.7,
                reason: '符合企业可持续发展战略'
            },
            {
                id: 13,
                title: '智能仓储管理系统',
                category: '流程优化',
                rating: 4.6,
                reason: '与您关注的自动化领域相关'
            },
            {
                id: 14,
                title: '客户关系管理平台升级',
                category: '客户服务',
                rating: 4.8,
                reason: '提升客户满意度的重要举措'
            }
        ];
    }

    // 切换分类
    switchCategory(category) {
        // 更新活动状态
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // 更新当前分类
        this.currentCategory = category;

        // 更新页面标题和描述
        this.updateCategoryInfo(category);

        // 重新渲染提案
        this.renderProposals();

        // 添加切换动画
        this.addCategoryTransition();
    }

    // 更新分类信息
    updateCategoryInfo(category) {
        const categoryInfo = {
            innovation: {
                title: '技术创新提案',
                description: '探索最新的技术创新提案，推动企业数字化转型'
            },
            process: {
                title: '流程优化提案',
                description: '优化企业运营流程，提升工作效率和准确性'
            },
            management: {
                title: '管理改进提案',
                description: '改进企业管理体系，提升组织效能和竞争力'
            },
            customer: {
                title: '客户服务提案',
                description: '提升客户服务质量，增强客户满意度和忠诚度'
            },
            quality: {
                title: '质量提升提案',
                description: '提升产品质量和服务质量，增强企业竞争力'
            },
            cost: {
                title: '成本控制提案',
                description: '优化成本结构，提高企业盈利能力和竞争力'
            },
            safety: {
                title: '安全环保提案',
                description: '保障员工安全，履行环保责任，实现可持续发展'
            }
        };

        const info = categoryInfo[category];
        document.getElementById('category-title').textContent = info.title;
        document.getElementById('category-description').textContent = info.description;
    }

    // 添加分类切换动画
    addCategoryTransition() {
        const proposalsGrid = document.getElementById('proposals-grid');
        proposalsGrid.style.opacity = '0';
        proposalsGrid.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            proposalsGrid.style.transition = 'all 0.5s ease';
            proposalsGrid.style.opacity = '1';
            proposalsGrid.style.transform = 'translateY(0)';
        }, 100);
    }

    // 渲染提案
    renderProposals() {
        const proposalsGrid = document.getElementById('proposals-grid');
        const currentProposals = this.proposals[this.currentCategory] || [];
        
        proposalsGrid.innerHTML = currentProposals.map(proposal => `
            <div class="proposal-card" onclick="app.showProposalDetail(${proposal.id})">
                <div class="proposal-header">
                    <div class="proposal-title">${proposal.title}</div>
                    <div class="proposal-category">${proposal.category}</div>
                </div>
                <div class="proposal-description">${proposal.description}</div>
                <div class="proposal-footer">
                    <div class="proposal-rating">
                        <i class="fas fa-star"></i>
                        <span>${proposal.rating}</span>
                    </div>
                    <div class="proposal-date">${proposal.date}</div>
                </div>
            </div>
        `).join('');
    }

    // 渲染推荐提案
    renderRecommendations() {
        const recommendationsGrid = document.getElementById('recommendations-grid');
        
        recommendationsGrid.innerHTML = this.recommendations.map(proposal => `
            <div class="recommendation-card" onclick="app.showProposalDetail(${proposal.id})">
                <div class="recommendation-title">${proposal.title}</div>
                <div class="recommendation-category">${proposal.category}</div>
                <div class="recommendation-rating">
                    <i class="fas fa-star"></i>
                    <span>${proposal.rating}</span>
                </div>
            </div>
        `).join('');
    }

    // 排序提案
    sortProposals(sortBy) {
        const currentProposals = this.proposals[this.currentCategory] || [];
        let sortedProposals;

        switch (sortBy) {
            case 'rating':
                sortedProposals = [...currentProposals].sort((a, b) => b.rating - a.rating);
                break;
            case 'date':
                sortedProposals = [...currentProposals].sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'title':
                sortedProposals = [...currentProposals].sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                sortedProposals = currentProposals;
        }

        this.proposals[this.currentCategory] = sortedProposals;
        this.renderProposals();
    }

    // 发送聊天消息
    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();
        
        if (!message) return;

        // 添加用户消息
        this.addChatMessage(message, 'user');
        chatInput.value = '';

        // 模拟AI回复
        setTimeout(() => {
            const aiResponse = this.generateAIResponse(message);
            this.addChatMessage(aiResponse, 'ai');
        }, 1000);
    }

    // 添加聊天消息
    addChatMessage(content, type) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = type === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${avatar}
            </div>
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 保存到聊天历史
        this.chatHistory.push({ content, type, timestamp: new Date() });
    }

    // 生成AI回复
    generateAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // 关键词匹配
        if (lowerMessage.includes('创新') || lowerMessage.includes('技术')) {
            return '我为您推荐几个技术创新提案：基于AI的智能客服系统升级、区块链技术在供应链管理中的应用等。这些提案都具有很高的创新性和实用价值。';
        } else if (lowerMessage.includes('流程') || lowerMessage.includes('优化')) {
            return '流程优化类提案包括：生产流程数字化改造、采购审批流程优化等。这些提案能够显著提升工作效率。';
        } else if (lowerMessage.includes('管理') || lowerMessage.includes('改进')) {
            return '管理改进类提案有：员工绩效评估体系改革等。这些提案有助于提升企业管理水平。';
        } else if (lowerMessage.includes('客户') || lowerMessage.includes('服务')) {
            return '客户服务类提案包括：客户反馈系统升级等。这些提案能够提升客户满意度和忠诚度。';
        } else if (lowerMessage.includes('质量') || lowerMessage.includes('提升')) {
            return '质量提升类提案有：质量管理体系认证升级等。这些提案有助于提升企业产品质量和服务质量。';
        } else if (lowerMessage.includes('成本') || lowerMessage.includes('控制')) {
            return '成本控制类提案包括：能源消耗优化方案等。这些提案能够帮助企业降低运营成本。';
        } else if (lowerMessage.includes('安全') || lowerMessage.includes('环保')) {
            return '安全环保类提案有：安全生产管理系统升级等。这些提案能够保障员工安全，履行环保责任。';
        } else if (lowerMessage.includes('推荐') || lowerMessage.includes('建议')) {
            return '根据您的需求，我推荐您查看"系统推荐提案"区域，那里有基于您偏好的个性化推荐。';
        } else {
            return '感谢您的提问！我可以帮您查询各类提案信息，包括技术创新、流程优化、管理改进等。请告诉我您具体需要了解哪方面的提案？';
        }
    }

    // 显示提案详情
    showProposalDetail(proposalId) {
        // 查找提案
        let proposal = null;
        for (const category in this.proposals) {
            const found = this.proposals[category].find(p => p.id === proposalId);
            if (found) {
                proposal = found;
                break;
            }
        }
        
        if (!proposal) {
            // 在推荐提案中查找
            proposal = this.recommendations.find(p => p.id === proposalId);
        }

        if (proposal) {
            this.openModal(proposal);
        }
    }

    // 打开模态框
    openModal(proposal) {
        const modal = document.getElementById('proposal-modal');
        const modalBody = modal.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <h2 class="modal-title">${proposal.title}</h2>
            <div class="modal-category">${proposal.category}</div>
            <p class="modal-description">${proposal.description}</p>
            <div class="modal-details">
                <div class="modal-detail-item">
                    <i class="fas fa-user"></i>
                    <span>提案人：${proposal.author || '未知'}</span>
                </div>
                <div class="modal-detail-item">
                    <i class="fas fa-building"></i>
                    <span>部门：${proposal.department || '未知'}</span>
                </div>
                <div class="modal-detail-item">
                    <i class="fas fa-info-circle"></i>
                    <span>状态：${proposal.status || '未知'}</span>
                </div>
                <div class="modal-detail-item">
                    <i class="fas fa-chart-line"></i>
                    <span>影响：${proposal.impact || '未知'}</span>
                </div>
                <div class="modal-detail-item">
                    <i class="fas fa-coins"></i>
                    <span>成本：${proposal.cost || '未知'}</span>
                </div>
                <div class="modal-detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>日期：${proposal.date || '未知'}</span>
                </div>
            </div>
            <div class="modal-rating">
                <span>评分：</span>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span>${proposal.rating}</span>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    // 关闭模态框
    closeModal() {
        document.getElementById('proposal-modal').style.display = 'none';
    }

    // 显示优质提案
    showQualityProposals(type) {
        const qualityTypes = ['本月最佳', '季度优秀', '年度卓越'];
        const typeName = qualityTypes[type];
        
        // 根据类型筛选提案
        let qualityProposals = [];
        for (const category in this.proposals) {
            qualityProposals = qualityProposals.concat(this.proposals[category]);
        }
        
        // 按评分排序并取前3个
        qualityProposals.sort((a, b) => b.rating - a.rating);
        qualityProposals = qualityProposals.slice(0, 3);
        
        // 更新当前分类显示
        this.currentCategory = 'quality';
        this.proposals.quality = qualityProposals;
        
        // 更新页面标题
        document.getElementById('category-title').textContent = `${typeName}提案`;
        document.getElementById('category-description').textContent = `展示${typeName}的优质提案，这些提案代表了企业的最高水平`;
        
        // 重新渲染提案
        this.renderProposals();
        
        // 更新导航状态
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    // 加载聊天历史
    loadChatHistory() {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            this.chatHistory = JSON.parse(savedHistory);
        }
    }

    // 保存聊天历史
    saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AIProposalAssistant();
});

// 添加一些额外的交互效果
document.addEventListener('DOMContentLoaded', () => {
    // 提案卡片悬停效果
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.proposal-card')) {
            e.target.closest('.proposal-card').style.transform = 'translateY(-5px) scale(1.02)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.proposal-card')) {
            e.target.closest('.proposal-card').style.transform = 'translateY(0) scale(1)';
        }
    });

    // 推荐卡片悬停效果
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.recommendation-card')) {
            e.target.closest('.recommendation-card').style.transform = 'translateY(-5px) scale(1.02)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.recommendation-card')) {
            e.target.closest('.recommendation-card').style.transform = 'translateY(0) scale(1)';
        }
    });

    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
