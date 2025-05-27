import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const vueJsSections = [
  {
    heading: "What is Vue.js?",
    content: `Vue.js is a progressive JavaScript framework used to build user interfaces. It is designed to be incrementally adoptable and focuses on the view layer, making it easy to integrate with other libraries or existing projects.`
  },
  {
    heading: "Core Concepts",
    content: `• Declarative Rendering
• Component-based Architecture
• Reactive Data Binding
• Directives and Event Handling
• Computed Properties and Watchers
• Vue CLI for project scaffolding`
  },
  {
    heading: "Getting Started",
    code: `<!-- Include Vue via CDN -->
<script src=\"https://unpkg.com/vue@3/dist/vue.global.js\"></script>

<div id=\"app\">
  {{ message }}
</div>

<script>
  Vue.createApp({
    data() {
      return {
        message: 'Hello Vue!'
      };
    }
  }).mount('#app');
</script>`
  },
  {
    heading: "Vue CLI Setup",
    code: `# Install Vue CLI
yarn global add @vue/cli
# or
npm install -g @vue/cli

# Create a new project
vue create my-project

# Start dev server
cd my-project
npm run serve`
  },
  {
    heading: "Template Syntax",
    content: `• Interpolation: {{ variable }}
• Directives: v-if, v-for, v-bind, v-model, v-on
• Event Handling: v-on:click or @click
• Binding Attributes: :src, :class, :style`
  },
  {
    heading: "Reactivity System",
    content: `• Data properties are reactive by default
• Use ref() for primitives and reactive() for objects in Composition API
• Changes in reactive data trigger DOM updates`
  },
  {
    heading: "Computed Properties and Watchers",
    code: `computed: {
  reversedMessage() {
    return this.message.split('').reverse().join('');
  }
},

watch: {
  message(newVal, oldVal) {
    console.log('Message changed from', oldVal, 'to', newVal);
  }
}`
  },
  {
    heading: "Components",
    code: `// Define a component
app.component('greeting', {
  template: '<p>Hello from component!</p>'
});

// Use in template
<greeting />`
  },
  {
    heading: "Props and Events",
    code: `// Parent template
<child-component :title=\"heading\" @notify=\"handleNotify\"></child-component>

// Child component
props: ['title'],

methods: {
  notifyParent() {
    this.$emit('notify');
  }
}`
  },
  {
    heading: "Routing with Vue Router",
    code: `import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});`
  },
  {
    heading: "State Management with Vuex",
    code: `import { createStore } from 'vuex';

const store = createStore({
  state() {
    return { count: 0 };
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});`
  },
  {
    heading: "Best Practices",
    content: `• Use Single File Components (.vue)
• Organize components logically
• Use Composition API for reusable logic
• Prefer computed properties over methods for derived state
• Keep components small and focused`
  },
  {
    heading: "Common Use Cases",
    content: `• Interactive UIs
• Admin dashboards
• E-commerce frontends
• Form-heavy applications
• Mobile apps via NativeScript or Quasar`
  }
];

const VueJsCheatSheet = () => {
  return (
    <CheatSheetLayout
    language='javascript'
      title="Vue.js Cheat Sheet"
      description="In-depth reference and quick guide for Vue.js development."
      sections={vueJsSections}
    />
  );
};

export default VueJsCheatSheet;
