export interface Project {
  title: string;
  description: string;
  longDescription?: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  date: string;
  category: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: 'Low-Latency Trading System',
    description: 'Developed a high-performance trading system in C++, achieving a 35% reduction in order execution latency',
    longDescription: [
      'Developed a high-performance trading system in C++, achieving a 35% reduction in order execution latency',
      'Implemented efficient TCP/IP networking protocols on Linux, ensuring robust real-time data processing',
      'Integrated lock-free data structures and conducted comprehensive unit testing, enhancing system reliability'
    ],
    date: 'December 2024',
    category: 'Trading',
    technologies: ['C++', 'Linux', 'TCP/IP', 'Multithreading'],
    github: 'https://github.com/sujalsin/low_latency_trading'
  },
  {
    title: 'Intelligent Video Compression',
    description: 'Developed a high-performance video compression tool integrating C++ and Python',
    longDescription: [
      'Developed a high-performance video compression tool integrating C++ and Python',
      'Achieved 30% reduction in file size without significant quality loss using ML-based optimization',
      'Implemented real-time processing capabilities for live video streaming applications'
    ],
    date: 'November 2024',
    category: 'Video',
    technologies: ['C++', 'Python', 'OpenCV', 'TensorFlow'],
    github: 'https://github.com/sujalsin/video_compression_optimizer'
  },
  {
    title: 'Lock-Free Concurrent Queue',
    description: 'Developed a lock-free concurrent queue in Rust, reducing latency by 45% and increasing throughput by 60%',
    longDescription: [
      'Developed a lock-free concurrent queue in Rust, reducing latency by 45% and increasing throughput by 60%',
      'Eliminated data races and deadlocks using atomic operations and lock-free algorithms',
      'Achieved formal verification using Coq, ensuring thread safety and correctness'
    ],
    date: 'October 2024',
    category: 'Systems',
    technologies: ['Rust', 'Coq', 'Concurrent Programming'],
    github: 'https://github.com/sujalsin/concurrent-verification'
  },
  {
    title: 'HVS Video Pipeline',
    description: 'Designed an advanced video processing pipeline inspired by the Human Visual System',
    longDescription: [
      'Designed an advanced video processing pipeline inspired by the Human Visual System',
      'Developed a custom lightweight CNN for saliency detection and frame analysis',
      'Optimized pipeline performance for high-resolution 4K footage with minimal latency'
    ],
    date: 'September 2024',
    category: 'Video',
    technologies: ['Python', 'OpenCV', 'PyTorch', 'FFmpeg'],
    github: 'https://github.com/sujalsin/hvs_video_pipeline'
  },
  {
    title: 'GPU-Accelerated SQL Operators',
    description: 'Implemented high-performance SQL operators using CUDA, achieving up to 20x speedup',
    longDescription: [
      'Implemented high-performance SQL operators using CUDA, achieving up to 20x speedup',
      'Optimized memory access patterns and concurrency using shared memory and CUDA streams',
      'Integrated GPU-accelerated operators with existing SQL engines'
    ],
    date: 'August 2024',
    category: 'Systems',
    technologies: ['CUDA', 'C++', 'SQL', 'GPU Programming'],
    github: 'https://github.com/sujalsin/gpu-sql-operators'
  },
  {
    title: 'Real-Time Streaming Monitor',
    description: 'Developed a real-time performance monitoring tool for streaming applications',
    longDescription: [
      'Developed a real-time performance monitoring tool for streaming applications',
      'Implemented dashboard visualizations with Grafana for actionable insights',
      'Reduced monitoring overhead by 20% while enhancing system reliability'
    ],
    date: 'July 2024',
    category: 'Video',
    technologies: ['Go', 'Prometheus', 'Grafana', 'Time-series DB'],
    github: 'https://github.com/sujalsin/streaming-monitor'
  },
  {
    title: 'Adaptive JIT Compiler with ML',
    description: 'Designed an adaptive just-in-time compiler using C++ and TensorFlow',
    longDescription: [
      'Designed an adaptive just-in-time compiler using C++ and TensorFlow',
      'Incorporated machine learning-based optimization for dynamic code generation',
      'Enhanced execution speed by 25% and reduced compilation overhead by 30%'
    ],
    date: 'June 2024',
    category: 'Systems',
    technologies: ['C++', 'TensorFlow', 'Compiler Design', 'Machine Learning'],
    github: 'https://github.com/sujalsin/adaptive-jit-ml'
  },
  {
    title: 'Ensemble Deep RL Trading Platform',
    description: 'Developed an ensemble deep reinforcement learning trading platform',
    longDescription: [
      'Developed an ensemble deep reinforcement learning trading platform',
      'Improved trading strategy performance by 20% using multiple RL agents',
      'Conducted extensive backtesting and simulation on historical market data'
    ],
    date: 'May 2024',
    category: 'Trading',
    technologies: ['Python', 'PyTorch', 'Reinforcement Learning', 'Trading'],
    github: 'https://github.com/sujalsin/ensemble_trading'
  },
  {
    title: 'RISC-V Processor Core',
    description: 'Designed a RISC-V processor core in C++ and Verilog, supporting the RV32I instruction set',
    longDescription: [
      'Designed a RISC-V processor core in C++ and Verilog, supporting the RV32I instruction set',
      'Achieved 20% higher performance compared to baseline implementations',
      'Implemented multithreaded processing capabilities and optimized pipeline stages'
    ],
    date: 'April 2024',
    category: 'Systems',
    technologies: ['C++', 'Verilog', 'RISC-V', 'Computer Architecture'],
    github: 'https://github.com/sujalsin/riscv_core'
  }
];
