interface Project {
  title: string;
  description: string[];
  date: string;
  category: 'Trading' | 'Video' | 'Systems';
  technologies: string[];
  github?: string;
}

export const projects: Project[] = [
  {
    title: 'Causal Trading Strategy',
    description: [
      'Implemented advanced causal inference methods (DAGs, Propensity Score Matching, Instrumental Variables) for algorithmic trading, improving trading signal precision by 18%',
      'Conducted research and statistical analysis to identify true causal relationships in financial data, refining monetization systems and boosting ROI by 12%',
      'Enhanced risk management with dynamic position sizing and threshold-based filtering, reducing portfolio volatility by 15%'
    ],
    date: 'November 2024',
    category: 'Trading',
    technologies: ['Python', 'DAGs', 'Statistical Analysis', 'Risk Management'],
    github: '#'
  },
  {
    title: 'Temporal and Heterogeneous Graph Neural Network',
    description: [
      'Developed a THGNN model for stock price prediction, achieving a 10% improvement in prediction accuracy over traditional models',
      'Engineered comprehensive technical indicators and constructed dynamic graphs for daily trading data, improving feature representation by 15%',
      'Utilized multi-head attention mechanisms for temporal and graph-level attention, reducing prediction error by 12%'
    ],
    date: 'October 2024',
    category: 'Trading',
    technologies: ['Python', 'GNN', 'Deep Learning', 'Technical Analysis'],
    github: '#'
  },
  {
    title: 'Options Trading Platform',
    description: [
      'Built a high-performance options trading platform integrating C++ and Python, reducing computation time by 40%',
      'Implemented options pricing models (Black-Scholes, Binomial Tree, Monte Carlo simulations), improving pricing accuracy by 12%',
      'Integrated technical analysis tools and live market data, enhancing trading decision-making and increasing portfolio returns by 15%'
    ],
    date: 'August 2024',
    category: 'Trading',
    technologies: ['C++', 'Python', 'Financial Models', 'Technical Analysis'],
    github: '#'
  },
  {
    title: 'FRP Trading System',
    description: [
      'Developed a high-performance automated trading system combining OCaml and C++ using Functional Reactive Programming',
      'Designed a type-safe risk management module in OCaml, increasing system reliability',
      'Optimized performance-critical algorithms, enhancing execution speed by 30%'
    ],
    date: 'June 2024',
    category: 'Trading',
    technologies: ['OCaml', 'C++', 'FRP', 'Risk Management'],
    github: '#'
  },
  {
    title: 'FinData Engine',
    description: [
      'Created a high-performance financial data storage engine with hybrid in-memory and on-disk architecture',
      'Integrated Rust-accelerated numerical operations and advanced compression techniques',
      'Designed a custom time-series indexing system optimized for financial data'
    ],
    date: 'November 2023',
    category: 'Trading',
    technologies: ['Rust', 'Time-series Database', 'Data Compression'],
    github: '#'
  },
  {
    title: 'Video Compression Optimizer',
    description: [
      'Developed a high-performance video compression tool integrating C++ and Python, achieving 30% reduction in data size',
      'Implemented machine learning models using TensorFlow to predict optimal encoding parameters',
      'Conducted comprehensive quality assessments using PSNR and SSIM metrics'
    ],
    date: 'November 2024',
    category: 'Video',
    technologies: ['C++', 'Python', 'FFmpeg', 'OpenCV', 'TensorFlow'],
    github: '#'
  },
  {
    title: 'Content Delivery Network Simulator',
    description: [
      'Engineered a sophisticated CDN simulator with machine learning-based traffic prediction',
      'Integrated an LRU caching system using Redis, increasing cache hit rates by 35%',
      'Implemented real-time metrics collection using Prometheus and Grafana'
    ],
    date: 'October 2024',
    category: 'Systems',
    technologies: ['Python', 'Redis', 'Prometheus', 'Grafana'],
    github: '#'
  },
  {
    title: 'HVS Video Pipeline',
    description: [
      'Designed an advanced video processing pipeline inspired by the Human Visual System',
      'Developed a custom lightweight CNN for saliency detection',
      'Implemented comprehensive quality assessment metrics'
    ],
    date: 'August 2024',
    category: 'Video',
    technologies: ['PyTorch', 'OpenCV', 'FFmpeg', 'Deep Learning'],
    github: '#'
  },
  {
    title: 'DSL for Quantum Computing',
    description: [
      'Designed and implemented a type-safe DSL in Haskell for quantum algorithms',
      'Developed core components for quantum state management and interpreter system',
      'Enabled accurate simulation of quantum operations'
    ],
    date: 'November 2024',
    category: 'Systems',
    technologies: ['Haskell', 'Quantum Computing', 'DSL'],
    github: '#'
  },
  {
    title: 'Lock-Free Queue with Formal Verification',
    description: [
      'Implemented the Michael-Scott lock-free queue in Rust',
      'Formally verified thread safety and memory safety using Coq and Loom',
      'Optimized performance achieving 30% reduction in latency'
    ],
    date: 'October 2024',
    category: 'Systems',
    technologies: ['Rust', 'Coq', 'Formal Verification'],
    github: '#'
  },
  {
    title: 'Secure Verifiable Voting System',
    description: [
      'Implemented a dual-language secure voting system using homomorphic encryption',
      'Formally verified security properties using Coq and ProVerif',
      'Achieved high performance through optimized cryptographic operations'
    ],
    date: 'August 2024',
    category: 'Systems',
    technologies: ['Rust', 'Go', 'Cryptography', 'Formal Verification'],
    github: '#'
  }
];
