/**
 * Shaders GLSL de la structure fractale (Milestone 3).
 *
 * Utilisés par un ShaderMaterial rendu sur un InstancedMesh :
 * - `instanceMatrix` / `instanceColor` sont injectés automatiquement par
 *   three.js (définies `USE_INSTANCING` / `USE_INSTANCING_COLOR`).
 * - `cameraPosition`, `modelMatrix`, `viewMatrix`, `projectionMatrix`,
 *   `position` sont aussi fournis par three.js dans le préfixe du shader.
 */

export const fractalVertexShader = /* glsl */ `
  uniform float uTime;

  varying vec3 vColor;
  varying float vDepth;

  void main() {
    // Couleur par instance (dégradé barycentrique des 3 piliers).
    vColor = instanceColor;

    // Origine de l'instance dans l'espace monde (pour la phase d'animation).
    vec4 wsOrigin = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    float phase = length(wsOrigin.xyz) * 1.8;

    // "Respiration" organique : chaque fragment pulse avec sa propre phase.
    float breathe = 1.0 + 0.12 * sin(uTime * 1.1 + phase);

    vec3 p = position * breathe;

    vec4 wsPos = modelMatrix * instanceMatrix * vec4(p, 1.0);
    vDepth = distance(wsPos.xyz, cameraPosition);

    gl_Position = projectionMatrix * viewMatrix * wsPos;
  }
`;

export const fractalFragmentShader = /* glsl */ `
  uniform float uTime;

  varying vec3 vColor;
  varying float vDepth;

  void main() {
    // Pulsation douce + atténuation avec la distance (léger effet de lueur).
    float pulse = 0.6 + 0.4 * sin(uTime * 1.4 + vDepth * 0.55);
    float fall = smoothstep(22.0, 3.0, vDepth);

    vec3 c = vColor * (0.3 + 0.7 * fall) * pulse;

    // Correction gamma approchée (le shader écrit directement dans le
    // framebuffer sRGB — pas de chunk de tonemapping dans un ShaderMaterial).
    c = pow(c, vec3(0.4545));

    gl_FragColor = vec4(c, 1.0);
  }
`;