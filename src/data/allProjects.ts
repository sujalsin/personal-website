interface Project {
  title: string;
  description: string[];
  technologies: string[];
  github: string;
  category: 'Trading' | 'Systems' | 'Video' | 'ML';
}

export const allProjects: Project[] = [
  {
    title: 'Low-Latency Trading System Prototype',
    description: [
      'Developed a high-performance trading system in C++, achieving a 35% reduction in order execution latency',
      'Implemented efficient TCP/IP networking protocols on Linux, ensuring robust real-time data processing',
      'Integrated lock-free data structures and conducted comprehensive unit testing'
    ],
    technologies: ['C++', 'Linux', 'TCP/IP', 'Multithreading'],
    github: 'https://github.com/sujalsin/low_latency_trading',
    category: 'Trading'
  },
  {
    title: 'FPGA Trading Accelerator',
    description: [
      'Engineered an FPGA-based trading accelerator using C++ and SystemVerilog, achieving sub-microsecond latency',
      'Optimized hardware-software interactions with PCIe communication',
      'Collaborated with cross-functional teams to deploy and test FPGA modules'
    ],
    technologies: ['C++', 'SystemVerilog', 'FPGA', 'PCIe'],
    github: 'https://github.com/sujalsin/fpga_trading_accelerator',
    category: 'Trading'
  },
  {
    title: 'RISC-V Processor Core',
    description: [
      'Designed a RISC-V processor core in C++ and Verilog, supporting the RV32I instruction set',
      'Implemented multithreaded processing capabilities and optimized pipeline stages',
      'Conducted comprehensive testing and verification'
    ],
    technologies: ['C++', 'Verilog', 'RISC-V', 'Computer Architecture'],
    github: 'https://github.com/sujalsin/riscv_core',
    category: 'Systems'
  },
  {
    title: 'Lock-Free Concurrent Queue',
    description: [
      'Developed a lock-free concurrent queue in Rust, reducing latency by 45%',
      'Eliminated data races and deadlocks using atomic operations',
      'Achieved formal verification using Coq, ensuring thread safety'
    ],
    technologies: ['Rust', 'Coq', 'Concurrent Programming'],
    github: 'https://github.com/sujalsin/concurrent-verification',
    category: 'Systems'
  },
  {
    title: 'RoboBudget',
    description: [
      'Built a comprehensive personal finance management application',
      'Implemented financial analytics and smart alert features',
      'Designed a responsive frontend with Material-UI and Recharts'
    ],
    technologies: ['React', 'TypeScript', 'Ruby on Rails', 'Material-UI'],
    github: 'https://github.com/sujalsin/robobudget',
    category: 'Systems'
  },
  {
    title: 'CoinSight',
    description: [
      'Developed a distributed cryptocurrency portfolio management platform',
      'Implemented real-time portfolio tracking and interactive market trend charts',
      'Integrated secure JWT-based authentication and API rate limiting'
    ],
    technologies: ['React', 'Ruby on Rails', 'Go', 'JWT'],
    github: 'https://github.com/sujalsin/coinsight',
    category: 'Trading'
  },
  {
    title: 'GreenRoute',
    description: [
      'Created an eco-conscious route planning application',
      'Integrated multi-modal transportation options and EV charging station data',
      'Implemented environmental impact calculations and visualizations'
    ],
    technologies: ['React', 'TypeScript', 'Go', 'Maps API'],
    github: 'https://github.com/sujalsin/greenroute',
    category: 'Systems'
  },
  {
    title: 'Collaborative Docs',
    description: [
      'Developed a real-time collaborative document editing platform',
      'Implemented secure JWT-based authentication and role-based access control',
      'Utilized Spring WebSocket for real-time communication'
    ],
    technologies: ['Spring Boot', 'Java', 'WebSocket', 'JWT'],
    github: 'https://github.com/sujalsin/collaborative-docs',
    category: 'Systems'
  },
  {
    title: 'GPU-Accelerated Vector Database',
    description: [
      'Designed a GPU-accelerated vector database with advanced indexing methods',
      'Achieved 20x speedup in query performance through CUDA parallelization',
      'Developed robust persistence layer with efficient GPU memory management'
    ],
    technologies: ['CUDA', 'C++', 'Vector Search', 'GPU'],
    github: 'https://github.com/sujalsin/gpu_vector_db',
    category: 'Systems'
  },
  {
    title: 'GPU-Accelerated SQL Operators',
    description: [
      'Implemented high-performance SQL operators using CUDA',
      'Optimized memory access patterns and concurrency',
      'Integrated with existing SQL engines for seamless deployment'
    ],
    technologies: ['CUDA', 'C++', 'SQL', 'GPU'],
    github: 'https://github.com/sujalsin/gpu-sql-operators',
    category: 'Systems'
  },
  {
    title: 'GPU Graph Analytics',
    description: [
      'Developed GPU-optimized graph algorithms including PageRank and Node2Vec',
      'Implemented efficient memory management and parallel processing techniques',
      'Designed comprehensive performance profiling framework'
    ],
    technologies: ['CUDA', 'C++', 'Graph Analytics'],
    github: 'https://github.com/sujalsin/gpu_graph_analytics',
    category: 'Systems'
  },
  {
    title: 'GPU-Accelerated Data Compression',
    description: [
      'Implemented GPU-accelerated data compression algorithms',
      'Optimized memory access patterns and utilized shared memory',
      'Developed adaptive compression strategies'
    ],
    technologies: ['CUDA', 'C++', 'Data Compression'],
    github: 'https://github.com/sujalsin/gpu_compression',
    category: 'Systems'
  },
  {
    title: 'Stock Price Prediction ML Pipeline',
    description: [
      'Developed a machine learning pipeline for stock price prediction',
      'Implemented data preprocessing and feature engineering techniques',
      'Deployed the pipeline on AWS for real-time predictions'
    ],
    technologies: ['Python', 'TensorFlow', 'AWS', 'ML'],
    github: 'https://github.com/sujalsin/stock_prediction',
    category: 'ML'
  },
  {
    title: 'FRP Trading System',
    description: [
      'Built a functional reactive programming based trading system in Haskell',
      'Implemented complex trading algorithms with 30% reduced latency',
      'Integrated with external financial APIs and data streams'
    ],
    technologies: ['Haskell', 'FRP', 'Trading'],
    github: 'https://github.com/sujalsin/frp_trading_system',
    category: 'Trading'
  },
  {
    title: 'Financial Market Prediction System',
    description: [
      'Designed a financial market prediction system using ML models',
      'Achieved 20% improvement in prediction accuracy',
      'Deployed on cloud platform for scalable processing'
    ],
    technologies: ['Python', 'ML', 'Cloud Computing'],
    github: 'https://github.com/sujalsin/financial_predictor',
    category: 'ML'
  },
  {
    title: 'Intelligent Video Compression',
    description: [
      'Developed a video compression optimizer using Python and OpenCV',
      'Achieved 30% reduction in file size without quality loss',
      'Optimized for real-time processing in streaming applications'
    ],
    technologies: ['Python', 'OpenCV', 'ML', 'Video Processing'],
    github: 'https://github.com/sujalsin/video_compression_optimizer',
    category: 'Video'
  },
  {
    title: 'CDN Simulator',
    description: [
      'Built a content delivery network simulator',
      'Implemented caching algorithms and traffic routing strategies',
      'Optimized content delivery efficiency by 40%'
    ],
    technologies: ['Python', 'Networking', 'Simulation'],
    github: 'https://github.com/sujalsin/cdn-simulator',
    category: 'Systems'
  },
  {
    title: 'Real-Time Streaming Monitor',
    description: [
      'Developed a performance monitoring tool for streaming applications',
      'Implemented dashboard visualizations with Grafana',
      'Reduced monitoring overhead by 20%'
    ],
    technologies: ['Go', 'Prometheus', 'Grafana'],
    github: 'https://github.com/sujalsin/streaming-monitor',
    category: 'Video'
  },
  {
    title: 'HVS Video Pipeline',
    description: [
      'Created an end-to-end video processing pipeline',
      'Implemented real-time video stabilization and enhancement',
      'Optimized for high-resolution 4K footage'
    ],
    technologies: ['Python', 'OpenCV', 'Video Processing'],
    github: 'https://github.com/sujalsin/hvs_video_pipeline',
    category: 'Video'
  },
  {
    title: 'FPGA High-Speed Networking',
    description: [
      'Designed a high-speed networking module on FPGA',
      'Achieved data transfer rates of up to 10 Gbps',
      'Implemented efficient error-checking mechanisms'
    ],
    technologies: ['Verilog', 'FPGA', 'Networking'],
    github: 'https://github.com/sujalsin/fpga_network_module',
    category: 'Systems'
  }
];
