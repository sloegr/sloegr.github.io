/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, LedgerItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'CC_082',
    title: 'DISTRIBUTED_CACHE_SYS',
    status: 'STABLE_V2',
    description: 'High-performance memory allocation engine with low-latency node synchronization for multi-region clusters.',
    tech: ['Rust', 'gRPC', 'Redis'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtp9MYKe3kFP_uwsG8-sIcDElFTS1b5hpqADcUov2L2Vivqz2N-8wtJnwaa9ZPmpiruF4umfE8iABw7i0WkqA0QiHcmpWTiT4bfjWF8aUKJaNHUq9eku1IW2xAf2XLDS2Upz2_EgdDFC_YLyH2Yboc---3gN85t10Xw5M9OdqlvXXnHvBOfJt9j1qXm8GN-kF1UJxnMNxZdA6MjE-4ZOhbXt_ldowWNdKjx1v2zwMuPC0Tl4yZmLGXhg',
    specs: [
      { label: 'Latency', value: '1.2ms Avg' },
      { label: 'Throughput', value: '4.2M req/s' }
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100 / 100', color: 'accent-green' },
      { label: 'Build Time', value: '1.24s' },
      { label: 'Asset Size', value: '42kb' },
      { label: 'Uptime', value: '99.99%', color: 'accent-green' }
    ]
  },
  {
    id: 'AX_119',
    title: 'NEURAL_MESH_v0.4',
    status: 'BETA_BUILD',
    description: 'Self-optimizing mesh network layer utilizing decentralized consensus protocols for edge compute nodes.',
    tech: ['Go', 'WASM', 'Libp2p'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz-eRUQCC53WmhOZHB3fCyfa8B-WJ1ky6NiQXzklz3vM-Ep7K2aQwmL5hAarGqG0F1NFMnPljSalfhTRtDoJmix1XJxh2ELlIf44DI12Q9-eyJhNlHNWzxZS4GCG-NeO8EeJ_bv0K0mw3t_FHbY7wqjYUoqGghyP4cnv8sQYW6q8TlsZ1og3Q1my3xqUloiaGUVSzebGcoI_l_VDYmZVToR8efwplnZyGXSj8WC-Ll893Gu0fhDKr3Bw',
    specs: [
      { label: 'Uptime', value: '99.998%' },
      { label: 'Mesh_Nodes', value: '12,401' }
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '98 / 100', color: 'accent-green' },
      { label: 'Build Time', value: '2.45s' },
      { label: 'Asset Size', value: '128kb' },
      { label: 'Uptime', value: '99.99%', color: 'accent-green' }
    ]
  },
  {
    id: 'DB_994',
    title: 'KRYPTOS_ENGINE',
    status: 'LEGACY_STABLE',
    description: 'Hardware-accelerated encryption layer for cold storage archiving with zero-knowledge verification.',
    tech: ['C++', 'CUDA', 'AES-GCM'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFRMO5roFrQuZAVcDrpcTmseoAa-LfOV7TISkPEPq20Ql_tK--jKL1nvpTwYl5h2lh68x-cogWAOTI9EAfjxtGVHqsGk4i2VS_XvcmQ3RP2Q1gbrDmUF5h8FcYPfm-yQ1GrjRb1_bun--9PINmyhTYxAoiUdxIjI9qXNsRjMLk2iRP7ceOvJ5RXpM7Pwlj6Lf5CQx76aeN0g-ecphnUcqAd4fyYDCMMPAVk4PTwLIsla0wbvYq4KTJWw',
    specs: [
      { label: 'Encryption', value: '4096-bit' },
      { label: 'Safety_Index', value: 'AAA+' }
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100 / 100', color: 'accent-green' },
      { label: 'Build Time', value: '1.98s' },
      { label: 'Asset Size', value: '76kb' },
      { label: 'Uptime', value: '100.0%', color: 'accent-green' }
    ]
  }
];

export const LEDGER_ITEMS: LedgerItem[] = [
  { tool: '[ GitHub ]', type: 'Version Control', proficiency: 95, status: 'ONLINE' },
  { tool: '[ ChatGPT ]', type: 'AI Assistant', proficiency: 90, status: 'ONLINE' },
  { tool: '[ Claude ]', type: 'AI Assistant', proficiency: 85, status: 'ONLINE' },
  { tool: '[ OpenCode ]', type: 'IDE Workflow', proficiency: 80, status: 'ONLINE' },
  { tool: '[ Legacy.Sys ]', type: 'Deprecated Tool', proficiency: 45, status: 'OFFLINE' }
];

export const SYSTEM_ARCH_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9aLl_SSmMuMiB0eebRTYkPqengeRylKohMzhZBaV-8-LArCt4uFZ2UTbilgL9TaOWdL64bea_AOXT61fe_X6EDf3Jf_qqVQOnDA9cj-Fe5ULcCasIIp853jnbdQRE0G1Tk8No12Ei3hEY_ydZ4pHM5KYLz2_9qo7JwCKCTj5b8hcZrst2oyfv6kv1Dnn47HflyEOh-MTe2Dsfne_dijg0fDhM5TP4Ve5pTU6B-GhKkY-vw0SNgzPGSQ';
