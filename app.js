(() => {
  'use strict';

  const APP_NAME = '栖居';
  const STORAGE_KEY = 'qiju.workbench.v1';
  const APP_VERSION = 1;
  const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];
  const WEEKDAY_FULL = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  const PRIORITY = { 1: '低', 2: '中', 3: '高' };
  const STATUS = { todo: '待办', doing: '进行中', done: '已完成', cancelled: '已取消' };
  const PROJECT_TYPES = { study: '学习', exam: '考试', life: '生活', creative: '创作', other: '其他' };
  const TONE_LABELS = { gentle: '儒雅温和', quiet: '清静简洁', firm: '严格但不苛刻', playful: '轻松一点' };
  const TAG_PALETTE = ['#4c6b5d', '#78929c', '#b08a5d', '#8a7d9c', '#a46057', '#6e8a76', '#9b8b6e'];
  const EMPTY_SVG = '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>';

  const ICONS = {
    home: '<path d="m3 10.5 9-7.5 9 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/>',
    check: '<path d="m5 12 4.5 4.5L19 7"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.7 2.7L16.5 9"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r=".8" fill="currentColor"/><circle cx="3.5" cy="12" r=".8" fill="currentColor"/><circle cx="3.5" cy="18" r=".8" fill="currentColor"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    columns: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z"/><path d="M4 5.5v13"/>',
    bookOpen: '<path d="M12 6.5C10 4.5 6.5 4 4 5v14c2.5-1 6-.5 8 1.5 2-2 5.5-2.5 8-1.5V5c-2.5-1-6-.5-8 1.5Z"/><path d="M12 6.5v14"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.8-4L3 10"/><path d="M3 4v6h6"/><path d="M4 13a8 8 0 0 0 14.8 4L21 14"/><path d="M21 20v-6h-6"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M4 21h16"/>',
    trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v5M14 11v5"/>',
    edit: '<path d="M4 20h4L20 8l-4-4L4 16Z"/><path d="m14 6 4 4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    droplet: '<path d="M12 3s6 6.3 6 11a6 6 0 0 1-12 0c0-4.7 6-11 6-11Z"/>',
    utensils: '<path d="M7 3v8M4 3v4a3 3 0 0 0 6 0V3M7 11v10M17 3v18M17 3c3 2 3 7 0 9"/>',
    dumbbell: '<path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12"/>',
    shower: '<path d="M5 20h14"/><path d="M8 20V8a4 4 0 0 1 8 0v12"/><path d="M13 4h4l-2 4"/><path d="M4 4l1 1M3 8h1M7 3v1"/>',
    moon: '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/>',
    sparkle: '<path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1L6.5 8.5l4.1-1.4Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
    alert: '<path d="M12 3 2.5 20h19Z"/><path d="M12 9v4M12 17h.01"/>',
    play: '<path d="m8 5 11 7-11 7Z"/>',
    arrow: '<path d="M7 17 17 7M8 7h9v9"/>',
    leaf: '<path d="M20 4C10 4 4 9 4 16c0 2 .5 3.5 1.5 4.5C8 13 13 9.5 19 9.5 15 14 11 16 7 17"/><path d="M20 4c0 8-4 13-11 14"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>'
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function icon(name, className = '') {
    return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || EMPTY_SVG}</svg>`;
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (ch) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  const escAttr = esc;

  function uid(prefix = 'id') {
    let random = '';
    try {
      if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
        random = globalThis.crypto.randomUUID().slice(0, 10);
      }
    } catch (_) {
      random = '';
    }
    if (!random) random = Math.random().toString(36).slice(2, 12);
    return `${prefix}_${Date.now().toString(36)}_${random}`;
  }

  const pad2 = (n) => String(n).padStart(2, '0');
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  function dateKey(date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
  }

  function todayKey() {
    return dateKey(new Date());
  }

  function parseDateKey(key) {
    const [year, month, day] = String(key).split('-').map(Number);
    if (!year || !month || !day) return new Date();
    return new Date(year, month - 1, day);
  }

  function addDaysKey(key, amount) {
    const date = parseDateKey(key);
    date.setDate(date.getDate() + amount);
    return dateKey(date);
  }

  function startOfWeekKey(key = todayKey()) {
    const date = parseDateKey(key);
    const offset = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() - offset);
    return dateKey(date);
  }

  function endOfWeekKey(key = todayKey()) {
    return addDaysKey(startOfWeekKey(key), 6);
  }

  function weekKeys(key = todayKey()) {
    const start = startOfWeekKey(key);
    return Array.from({ length: 7 }, (_, index) => addDaysKey(start, index));
  }

  function lastNDays(count) {
    const today = todayKey();
    return Array.from({ length: count }, (_, index) => addDaysKey(today, index - count + 1));
  }

  function isDateKey(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
  }

  function isTimeValue(value) {
    return /^\d{2}:\d{2}$/.test(String(value || ''));
  }

  function formatDateLong(key) {
    const date = parseDateKey(key);
    const weekday = WEEKDAY_FULL[(date.getDay() + 6) % 7];
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 · ${weekday}`;
  }

  function formatDateShort(key) {
    const date = parseDateKey(key);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }

  function formatMD(key) {
    const date = parseDateKey(key);
    return `${pad2(date.getMonth() + 1)}/${pad2(date.getDate())}`;
  }

  function formatMonth(date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  }

  function formatWeekRange(startKey, endKey) {
    const start = parseDateKey(startKey);
    const end = parseDateKey(endKey);
    if (start.getFullYear() === end.getFullYear()) {
      return `${start.getMonth() + 1}月${start.getDate()}日 – ${end.getMonth() + 1}月${end.getDate()}日`;
    }
    return `${start.getFullYear()}年${start.getMonth() + 1}月${start.getDate()}日 – ${end.getFullYear()}年${end.getMonth() + 1}月${end.getDate()}日`;
  }

  function formatTimestamp(iso) {
    if (!iso) return '还没有备份记录';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '还没有备份记录';
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
  }

  function timeToMinutes(value) {
    if (!isTimeValue(value)) return null;
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
  }

  function minutesToTime(total) {
    const normalized = ((Math.round(total) % 1440) + 1440) % 1440;
    return `${pad2(Math.floor(normalized / 60))}:${pad2(normalized % 60)}`;
  }

  function formatDuration(minutes) {
    const value = Math.max(0, Math.round(Number(minutes) || 0));
    if (!value) return '0 分钟';
    const hours = Math.floor(value / 60);
    const rest = value % 60;
    if (!hours) return `${rest} 分钟`;
    return `${hours} 小时${rest ? ` ${rest} 分` : ''}`;
  }

  function formatDurationShort(minutes) {
    const value = Math.max(0, Math.round(Number(minutes) || 0));
    if (!value) return '0m';
    const hours = Math.floor(value / 60);
    const rest = value % 60;
    if (!hours) return `${rest}m`;
    return `${hours}h${rest ? ` ${rest}m` : ''}`;
  }

  function todayLabel(key) {
    if (key === todayKey()) return '今天';
    if (key === addDaysKey(todayKey(), -1)) return '昨天';
    if (key === addDaysKey(todayKey(), 1)) return '明天';
    return formatMD(key);
  }

  function greetingWord() {
    const hour = new Date().getHours();
    if (hour < 5) return '夜深了';
    if (hour < 11) return '早上好';
    if (hour < 13) return '中午好';
    if (hour < 18) return '下午好';
    return '晚上好';
  }

  function hexToRgba(hex, alpha) {
    let value = String(hex || '').replace('#', '');
    if (value.length === 3) value = value.split('').map((ch) => ch + ch).join('');
    if (!/^[0-9a-f]{6}$/i.test(value)) return `rgba(76, 107, 93, ${alpha})`;
    const red = parseInt(value.slice(0, 2), 16);
    const green = parseInt(value.slice(2, 4), 16);
    const blue = parseInt(value.slice(4, 6), 16);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  function setPath(target, path, value) {
    const parts = String(path).split('.');
    let current = target;
    for (let index = 0; index < parts.length - 1; index += 1) {
      if (!current[parts[index]] || typeof current[parts[index]] !== 'object') current[parts[index]] = {};
      current = current[parts[index]];
    }
    current[parts[parts.length - 1]] = value;
  }

  function deepMerge(base, extra) {
    const output = Array.isArray(base) ? [...base] : { ...base };
    if (!extra || typeof extra !== 'object' || Array.isArray(extra)) return output;
    Object.entries(extra).forEach(([key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)
        && base[key] && typeof base[key] === 'object' && !Array.isArray(base[key])) {
        output[key] = deepMerge(base[key], value);
      } else if (value !== undefined) {
        output[key] = value;
      }
    });
    return output;
  }

  function defaultSettings() {
    return {
      character: { enabled: true, name: '', address: '', tone: 'gentle', strictness: 2, greeting: '' },
      reminders: {
        water: { enabled: true, start: '09:00', end: '21:00', every: 120 },
        shower: { enabled: true, time: '21:00' },
        vocab: { enabled: true, time: '20:30' },
        meals: {
          enabled: true,
          breakfast: { enabled: true, time: '08:00' },
          lunch: { enabled: true, time: '12:00' },
          dinner: { enabled: true, time: '18:30' }
        }
      },
      waterGoal: 8,
      vocabGoal: 20,
      lastBackup: ''
    };
  }

  function makeDay(waterGoal = 8, vocabGoal = 20) {
    return {
      mood: null,
      moodNote: '',
      water: 0,
      waterGoal: Number(waterGoal) || 8,
      meals: { breakfast: false, lunch: false, dinner: false },
      mealNote: '',
      exercise: { type: '', minutes: 0 },
      shower: false,
      vocab: 0,
      vocabGoal: Number(vocabGoal) || 20,
      sleep: { bed: '', wake: '' },
      note: ''
    };
  }

  function normalizeTask(raw = {}) {
    const status = Object.prototype.hasOwnProperty.call(STATUS, raw.status) ? raw.status : 'todo';
    return {
      id: String(raw.id || uid('task')),
      title: String(raw.title || '').slice(0, 200),
      notes: String(raw.notes || ''),
      projectId: String(raw.projectId || ''),
      sectionId: String(raw.sectionId || ''),
      tagIds: Array.isArray(raw.tagIds) ? raw.tagIds.map(String).filter(Boolean) : [],
      status,
      priority: [1, 2, 3].includes(Number(raw.priority)) ? Number(raw.priority) : 2,
      due: isDateKey(raw.due) ? raw.due : '',
      scheduledDate: isDateKey(raw.scheduledDate) ? raw.scheduledDate : '',
      startTime: isTimeValue(raw.startTime) ? raw.startTime : '',
      endTime: isTimeValue(raw.endTime) ? raw.endTime : '',
      estimate: clamp(Number(raw.estimate) || 60, 5, 1440),
      createdAt: raw.createdAt || new Date().toISOString(),
      completedAt: raw.completedAt || null
    };
  }

  function normalizeProject(raw = {}) {
    const type = Object.prototype.hasOwnProperty.call(PROJECT_TYPES, raw.type) ? raw.type : 'study';
    const sections = Array.isArray(raw.sections) ? raw.sections
      .filter((section) => section && section.name)
      .map((section) => ({
        id: String(section.id || uid('sec')),
        name: String(section.name).slice(0, 20),
        weight: clamp(Number(section.weight) || 0, 0, 100)
      })) : [];
    const manual = raw.manualProgress === null || raw.manualProgress === undefined || raw.manualProgress === ''
      ? null
      : clamp(Number(raw.manualProgress) || 0, 0, 100);
    return {
      id: String(raw.id || uid('proj')),
      name: String(raw.name || '未命名项目').slice(0, 40),
      type,
      color: /^#[0-9a-f]{6}$/i.test(String(raw.color || '')) ? raw.color : '#4c6b5d',
      description: String(raw.description || ''),
      target: String(raw.target || ''),
      deadline: isDateKey(raw.deadline) ? raw.deadline : '',
      tagIds: Array.isArray(raw.tagIds) ? raw.tagIds.map(String).filter(Boolean) : [],
      sections,
      manualProgress: manual,
      archived: Boolean(raw.archived),
      createdAt: raw.createdAt || new Date().toISOString()
    };
  }

  function normalizeDay(raw = {}, settings = defaultSettings()) {
    const base = makeDay(settings.waterGoal, settings.vocabGoal);
    return {
      ...base,
      ...raw,
      meals: { ...base.meals, ...(raw.meals || {}) },
      exercise: { ...base.exercise, ...(raw.exercise || {}) },
      sleep: { ...base.sleep, ...(raw.sleep || {}) },
      mood: [1, 2, 3, 4, 5].includes(Number(raw.mood)) ? Number(raw.mood) : null,
      water: Math.max(0, Number(raw.water) || 0),
      waterGoal: clamp(Number(raw.waterGoal) || base.waterGoal, 1, 30),
      vocab: Math.max(0, Number(raw.vocab) || 0),
      vocabGoal: clamp(Number(raw.vocabGoal) || base.vocabGoal, 1, 500),
      shower: Boolean(raw.shower)
    };
  }

  function defaultState() {
    const settings = defaultSettings();
    const englishTagId = uid('tag');
    const studyTagId = uid('tag');
    const lifeTagId = uid('tag');
    const ieltsId = uid('proj');
    return {
      version: APP_VERSION,
      createdAt: new Date().toISOString(),
      projects: [{
        id: ieltsId,
        name: '雅思',
        type: 'exam',
        color: '#4c6b5d',
        description: '听力、阅读、写作、口语，一点一点推进。',
        target: '',
        deadline: '',
        tagIds: [englishTagId, studyTagId],
        sections: [
          { id: uid('sec'), name: '听力', weight: 25 },
          { id: uid('sec'), name: '阅读', weight: 25 },
          { id: uid('sec'), name: '写作', weight: 25 },
          { id: uid('sec'), name: '口语', weight: 25 }
        ],
        manualProgress: null,
        archived: false,
        createdAt: new Date().toISOString()
      }],
      tags: [
        { id: englishTagId, name: '英语', color: '#78929c' },
        { id: studyTagId, name: '学习', color: '#4c6b5d' },
        { id: lifeTagId, name: '生活', color: '#b08a5d' }
      ],
      tasks: [],
      days: {},
      studySessions: [],
      settings
    };
  }

  function normalizeState(raw) {
    const defaults = defaultState();
    if (!raw || typeof raw !== 'object') return defaults;
    const settings = deepMerge(defaults.settings, raw.settings || {});
    const projects = Array.isArray(raw.projects) ? raw.projects.map(normalizeProject) : defaults.projects;
    const tags = Array.isArray(raw.tags) ? raw.tags.filter((tag) => tag && tag.name).map((tag) => ({
      id: String(tag.id || uid('tag')),
      name: String(tag.name).slice(0, 20),
      color: /^#[0-9a-f]{6}$/i.test(String(tag.color || '')) ? tag.color : pickTagColor(tag.name)
    })) : defaults.tags;
    const tasks = Array.isArray(raw.tasks) ? raw.tasks.map(normalizeTask) : [];
    const studySessions = Array.isArray(raw.studySessions) ? raw.studySessions
      .filter((session) => session && isDateKey(session.date))
      .map((session) => ({
        id: String(session.id || uid('study')),
        date: session.date,
        projectId: String(session.projectId || ''),
        minutes: clamp(Number(session.minutes) || 0, 1, 1440),
        note: String(session.note || ''),
        createdAt: session.createdAt || new Date().toISOString()
      })) : [];
    const days = {};
    if (raw.days && typeof raw.days === 'object') {
      Object.entries(raw.days).forEach(([key, day]) => {
        if (isDateKey(key)) days[key] = normalizeDay(day, settings);
      });
    }
    return {
      version: APP_VERSION,
      createdAt: raw.createdAt || new Date().toISOString(),
      projects,
      tags,
      tasks,
      days,
      studySessions,
      settings
    };
  }

  let state;
  let storageWasEmpty = false;
  let startupWarning = false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      storageWasEmpty = true;
      state = defaultState();
    } else {
      state = normalizeState(JSON.parse(stored));
    }
  } catch (error) {
    console.error('读取本地数据失败', error);
    startupWarning = true;
    state = defaultState();
  }

  const ui = {
    view: 'dashboard',
    taskFilter: 'all',
    taskProjectFilter: 'all',
    taskTagFilter: 'all',
    projectTagFilter: 'all',
    dayDate: todayKey(),
    calendarCursor: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    weekCursor: new Date(),
    mentorSeed: 0,
    confirmCallback: null,
    returnProjectId: '',
    lastView: null
  };

  const app = $('#app');
  const nav = $('#nav');
  const pageTitle = $('#pageTitle');
  const pageSubtitle = $('#pageSubtitle');
  const todayChip = $('#todayChip');
  const saveStatus = $('#saveStatus');
  const saveStatusText = $('#saveStatusText');
  const modalRoot = $('#modalRoot');
  const toastRoot = $('#toastRoot');
  const reminderRoot = $('#reminderRoot');
  const importFile = $('#importFile');

  const NAV_GROUPS = [
    { title: '总览', items: [
      { view: 'dashboard', label: '首页', icon: 'home' },
      { view: 'today', label: '今日', icon: 'leaf' }
    ] },
    { title: '计划', items: [
      { view: 'tasks', label: '任务', icon: 'list' },
      { view: 'calendar', label: '月历', icon: 'calendar' },
      { view: 'week', label: '周视图', icon: 'columns' }
    ] },
    { title: '成长', items: [
      { view: 'study', label: '学习', icon: 'bookOpen' },
      { view: 'projects', label: '项目', icon: 'folder' },
      { view: 'stats', label: '统计', icon: 'chart' }
    ] },
    { title: '系统', items: [
      { view: 'settings', label: '设置', icon: 'settings' }
    ] }
  ];

  const ROUTE_META = {
    dashboard: { title: '首页', subtitle: () => '今天也留一点空白。' },
    today: { title: '今日', subtitle: () => formatDateLong(ui.dayDate) },
    tasks: { title: '任务', subtitle: () => '轻一点记录，稳一点完成。' },
    calendar: { title: '月历', subtitle: () => formatMonth(ui.calendarCursor) },
    week: { title: '周视图', subtitle: () => `${formatWeekRange(startOfWeekKey(dateKey(ui.weekCursor)), endOfWeekKey(dateKey(ui.weekCursor)))} · 按时间分布` },
    study: { title: '学习', subtitle: () => '学习时长手动记录，不必精确到分钟。' },
    projects: { title: '项目', subtitle: () => '把目标拆成可以完成的小块。' },
    stats: { title: '统计', subtitle: () => '不追求满分，看看趋势。' },
    settings: { title: '设置', subtitle: () => '让工作台更像你自己的。' }
  };

  let saveTimer = null;
  let lastSavedAt = null;
  let renderedDay = todayKey();

  function pickTagColor(name) {
    let hash = 0;
    for (let index = 0; index < String(name).length; index += 1) {
      hash = (hash * 31 + String(name).charCodeAt(index)) | 0;
    }
    return TAG_PALETTE[Math.abs(hash) % TAG_PALETTE.length];
  }

  function ensureDay(key) {
    if (!state.days[key]) state.days[key] = makeDay(state.settings.waterGoal, state.settings.vocabGoal);
    return state.days[key];
  }

  function peekDay(key) {
    return state.days[key] || makeDay(state.settings.waterGoal, state.settings.vocabGoal);
  }

  function taskById(id) {
    return state.tasks.find((task) => task.id === id);
  }

  function projectById(id) {
    return state.projects.find((project) => project.id === id);
  }

  function sectionById(project, id) {
    return project && Array.isArray(project.sections) ? project.sections.find((section) => section.id === id) : null;
  }

  function tagById(id) {
    return state.tags.find((tag) => tag.id === id);
  }

  function tagsForTask(task) {
    return (task.tagIds || []).map(tagById).filter(Boolean);
  }

  function taskDates(task) {
    const result = new Set();
    if (task.due) result.add(task.due);
    if (task.scheduledDate) result.add(task.scheduledDate);
    return [...result];
  }

  function primaryDate(task) {
    return task.scheduledDate || task.due || '';
  }

  function timelineDate(task, start, end) {
    if (task.scheduledDate && task.scheduledDate >= start && task.scheduledDate <= end) return task.scheduledDate;
    if (task.due && task.due >= start && task.due <= end) return task.due;
    return '';
  }

  function isOpen(task) {
    return task.status === 'todo' || task.status === 'doing';
  }

  function isDone(task) {
    return task.status === 'done';
  }

  function isOverdue(task, reference = todayKey()) {
    return Boolean(task && isOpen(task) && task.due && task.due < reference);
  }

  function tasksForDate(key) {
    return state.tasks
      .filter((task) => task.status !== 'cancelled' && taskDates(task).includes(key))
      .sort(taskSort);
  }

  function taskSort(a, b) {
    const order = { doing: 0, todo: 1, done: 2, cancelled: 3 };
    const statusDiff = (order[a.status] ?? 9) - (order[b.status] ?? 9);
    if (statusDiff) return statusDiff;
    const dateA = primaryDate(a) || '9999-12-31';
    const dateB = primaryDate(b) || '9999-12-31';
    if (dateA !== dateB) return dateA.localeCompare(dateB);
    const timeA = a.startTime || '99:99';
    const timeB = b.startTime || '99:99';
    if (timeA !== timeB) return timeA.localeCompare(timeB);
    return Number(b.priority) - Number(a.priority);
  }

  function getWeekStats(key = todayKey()) {
    const start = startOfWeekKey(key);
    const end = endOfWeekKey(key);
    const tasks = state.tasks.filter((task) => task.status !== 'cancelled'
      && taskDates(task).some((date) => date >= start && date <= end));
    const open = tasks.filter(isOpen);
    const done = tasks.filter(isDone);
    const overdue = tasks.filter((task) => isOverdue(task) && task.due >= start && task.due <= end);
    const rate = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;
    return { start, end, tasks, open, done, overdue, rate };
  }

  function getOverallStats() {
    const tasks = state.tasks.filter((task) => task.status !== 'cancelled');
    const done = tasks.filter(isDone);
    const overdue = tasks.filter((task) => isOverdue(task));
    return {
      tasks,
      total: tasks.length,
      done: done.length,
      overdue: overdue.length,
      rate: tasks.length ? Math.round((done.length / tasks.length) * 100) : 0
    };
  }

  function getProjectStats(project) {
    const tasks = state.tasks.filter((task) => task.projectId === project.id && task.status !== 'cancelled');
    const done = tasks.filter(isDone);
    const auto = tasks.length ? Math.round((done.length / tasks.length) * 100) : 0;
    const manual = project.manualProgress === null || project.manualProgress === undefined
      ? null
      : clamp(Number(project.manualProgress) || 0, 0, 100);
    const value = manual === null ? auto : manual;
    const sections = (project.sections || []).map((section) => {
      const sectionTasks = tasks.filter((task) => task.sectionId === section.id);
      const sectionDone = sectionTasks.filter(isDone);
      return {
        ...section,
        tasks: sectionTasks,
        done: sectionDone.length,
        total: sectionTasks.length,
        progress: sectionTasks.length ? Math.round((sectionDone.length / sectionTasks.length) * 100) : 0
      };
    });
    return { tasks, done: done.length, total: tasks.length, auto, manual, value, sections };
  }

  function sleepMinutes(day) {
    if (!day || !day.sleep) return 0;
    const bed = timeToMinutes(day.sleep.bed);
    const wake = timeToMinutes(day.sleep.wake);
    if (bed === null || wake === null) return 0;
    const adjustedWake = wake <= bed ? wake + 1440 : wake;
    const diff = adjustedWake - bed;
    return diff > 0 && diff <= 24 * 60 ? diff : 0;
  }

  function sleepAverage(days = 7) {
    const values = lastNDays(days)
      .map((key) => state.days[key] ? sleepMinutes(state.days[key]) : 0)
      .filter((value) => value > 0);
    if (!values.length) return 0;
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }

  function habitSummary(day) {
    const meals = ['breakfast', 'lunch', 'dinner'].filter((key) => day.meals && day.meals[key]).length;
    const items = [
      { key: 'mood', label: '心情', done: Boolean(day.mood) },
      { key: 'water', label: '喝水', done: (Number(day.water) || 0) >= (Number(day.waterGoal) || 8) },
      { key: 'meals', label: '两餐', done: meals >= 2 },
      { key: 'exercise', label: '运动', done: (Number(day.exercise && day.exercise.minutes) || 0) > 0 },
      { key: 'shower', label: '洗澡', done: Boolean(day.shower) },
      { key: 'vocab', label: '单词', done: (Number(day.vocab) || 0) > 0 },
      { key: 'sleep', label: '睡眠', done: sleepMinutes(day) > 0 }
    ];
    const done = items.filter((item) => item.done).length;
    return { items, done, total: items.length, meals, rate: Math.round((done / items.length) * 100) };
  }

  function studyTotalBetween(start, end) {
    return state.studySessions
      .filter((session) => session.date >= start && session.date <= end)
      .reduce((sum, session) => sum + Number(session.minutes || 0), 0);
  }

  function studyTotalForDate(key) {
    return state.studySessions
      .filter((session) => session.date === key)
      .reduce((sum, session) => sum + Number(session.minutes || 0), 0);
  }

  function studyStreak() {
    let cursor = todayKey();
    let streak = 0;
    for (let index = 0; index < 365; index += 1) {
      if (studyTotalForDate(cursor) > 0) {
        streak += 1;
        cursor = addDaysKey(cursor, -1);
      } else if (index === 0) {
        cursor = addDaysKey(cursor, -1);
      } else {
        break;
      }
    }
    return streak;
  }

  function mentorName() {
    return state.settings.character.name.trim() || '督导';
  }

  function mentorInitial() {
    const name = mentorName();
    return name === '督导' ? '督' : name.slice(0, 1);
  }

  function avatarMarkup(extraClass = '') {
    if (!state.settings.character.enabled) return '<span class="avatar-fallback">静</span>';
    return `<img class="avatar-img ${extraClass}" src="avatar.png" alt="${escAttr(mentorName())}的虚拟形象" draggable="false">`;
  }

  function tonePick(gentle, quiet, firm, playful) {
    const tone = state.settings.character.tone;
    if (tone === 'quiet') return quiet;
    if (tone === 'firm') return firm;
    if (tone === 'playful') return playful;
    return gentle;
  }

  function mentorMessage() {
    if (!state.settings.character.enabled) return '督导角色已隐藏。你仍然可以安静地使用这个工作台。';
    const custom = state.settings.character.greeting.trim();
    if (custom) return custom;
    const week = getWeekStats();
    const day = peekDay(todayKey());
    const todayTasks = tasksForDate(todayKey()).filter(isOpen);
    const hour = new Date().getHours();
    const studyToday = studyTotalForDate(todayKey());
    const waterGoal = Number(day.waterGoal) || 8;
    const water = Number(day.water) || 0;
    const seed = ui.mentorSeed || 0;
    const strictness = Number(state.settings.character.strictness) || 2;

    if (week.overdue.length > 0) {
      if (strictness >= 3) return '这周有逾期任务。先把它处理掉，再开始新的。';
      return [
        tonePick(
          '这周有一件事已经过期了。别急着补全部，先把它拆成十分钟能开始的小步。',
          '有一件逾期的事。先做十分钟，再决定下一步。',
          '逾期的事先处理，别让它继续占着心里。',
          '有件事已经超时了，别装没看见。先动五分钟也算数。'
        ),
        tonePick(
          '本周还有未完成的事。挑最轻的一件，先让进度动起来。',
          '还有未完成的事。今天只处理一件就好。',
          '先清掉最旧的那件，再谈其他。',
          '拖延不会让任务消失，但你可以让它变小一点。'
        )
      ][seed % 2];
    }

    if (hour >= 22) {
      return tonePick(
        '已经很晚了。今天没做完的，明天还在。去洗漱，早点休息。',
        '夜深了。剩下的明天再说。',
        '今天到这里。睡眠也是计划的一部分。',
        '再熬下去，明天的你会记仇的。收工吧。'
      );
    }

    if (!todayTasks.length && week.tasks.length === 0) {
      if (strictness >= 3) return '今天还没有安排。先写一件，别让这一天滑过去。';
      return tonePick(
        '今天还没有安排。写下一件最想完成的事，就算开始了。',
        '还没有安排。先写一件。',
        '空白的一天也需要一个锚点。挑一件重要的事。',
        '今天还是一张白纸。要不要先画一笔？'
      );
    }

    if (week.tasks.length > 0 && week.rate >= 80) {
      return tonePick(
        '这周推进得很稳。剩下的时间，留一点给自己。',
        '进度不错。可以停一停。',
        '完成得很好。继续保持这个节奏。',
        '这周有点厉害。别把自己用太狠。'
      );
    }

    if (water < Math.ceil(waterGoal / 2) && hour >= 14) {
      return tonePick(
        '水杯还空着。先起身接一杯，再回来。',
        '该喝水了。',
        '先喝水，再继续。',
        '你的水杯在等你，别让它失业。'
      );
    }

    if (studyToday === 0 && hour >= 20) {
      return tonePick(
        '今天还没有记录学习时长。二十分钟也算向前。',
        '今天还没学习。二十分钟就够。',
        '如果还有力气，补二十分钟学习；没有就休息。',
        '今天的学习格还空着。要不要塞二十分钟进去？'
      );
    }

    if (todayTasks.length > 0) {
      return tonePick(
        '有几件事在等你。先挑最重要的一件，不必同时开始。',
        '今天有几件事。一次做一件。',
        '先完成最重要的那件，其余可以往后放。',
        '任务排好队了，挑一个顺眼的先开工。'
      );
    }

    return tonePick(
      '不用把每一格都填满，抓住今天最重要的一两件事就好。',
      '慢一点，也是在走。',
      '保持节奏。完成比完美重要。',
      '今天也不用满分，及格就很好了。'
    );
  }

  function praiseLine() {
    return tonePick(
      '完成了一件。很好，慢慢来。',
      '记下了。继续。',
      '这件事收尾了。保持这个节奏。',
      '漂亮。下一件可以晚点再说。'
    );
  }

  function characterPreviewHTML() {
    return `<div class="character-preview" id="characterPreview">
      <div class="mentor-avatar" data-action="view-avatar" role="button" tabindex="0" aria-label="查看督导形象">${avatarMarkup()}</div>
      <div class="character-preview-copy">
        <strong>${esc(mentorName())} · ${esc(TONE_LABELS[state.settings.character.tone] || TONE_LABELS.gentle)}</strong>
        <p>${esc(mentorMessage())}</p>
      </div>
    </div>`;
  }

  function queueSave() {
    if (saveStatus) {
      saveStatus.classList.remove('is-error');
      saveStatus.classList.add('is-saving');
      if (saveStatusText) saveStatusText.textContent = '保存中…';
    }
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 240);
  }

  function saveNow() {
    clearTimeout(saveTimer);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      lastSavedAt = new Date();
      if (saveStatus) {
        saveStatus.classList.remove('is-saving', 'is-error');
      }
      if (saveStatusText) saveStatusText.textContent = `已保存 ${pad2(lastSavedAt.getHours())}:${pad2(lastSavedAt.getMinutes())}`;
    } catch (error) {
      console.error('保存失败', error);
      if (saveStatus) saveStatus.classList.add('is-error');
      if (saveStatusText) saveStatusText.textContent = '本地保存失败';
      showToast('浏览器本地空间可能已满，建议先导出备份。', { title: '保存失败' });
    }
  }

  function updateSaveStatus() {
    if (lastSavedAt) {
      if (saveStatusText) saveStatusText.textContent = `已保存 ${pad2(lastSavedAt.getHours())}:${pad2(lastSavedAt.getMinutes())}`;
    } else if (saveStatusText) {
      saveStatusText.textContent = '本地自动保存';
    }
  }

  function renderNav() {
    nav.innerHTML = NAV_GROUPS.map((group) => `
      <div class="nav-group">
        <div class="nav-title">${group.title}</div>
        ${group.items.map((item) => `
          <a class="nav-item" href="#/${item.view}" data-view-link="${item.view}">
            ${icon(item.icon)}
            <span>${item.label}</span>
          </a>
        `).join('')}
      </div>
    `).join('');
  }

  function updateNav() {
    $$('.nav-item').forEach((item) => {
      item.classList.toggle('active', item.dataset.viewLink === ui.view);
    });
  }

  function updateTodayChip() {
    if (!todayChip) return;
    const now = new Date();
    const weekday = WEEKDAY_FULL[(now.getDay() + 6) % 7];
    todayChip.innerHTML = `<strong>${now.getMonth() + 1}月${now.getDate()}日</strong> · ${weekday}`;
  }

  function render() {
    if (!ROUTE_META[ui.view]) ui.view = 'dashboard';
    const meta = ROUTE_META[ui.view];
    pageTitle.textContent = meta.title;
    pageSubtitle.textContent = typeof meta.subtitle === 'function' ? meta.subtitle() : meta.subtitle;
    app.innerHTML = views[ui.view]();
    updateNav();
    updateTodayChip();
    updateSaveStatus();
    document.body.dataset.view = ui.view;
    if (ui.lastView !== ui.view) {
      app.classList.remove('view');
      void app.offsetWidth;
      app.classList.add('view');
      ui.lastView = ui.view;
    }
  }

  function navigate(view) {
    if (!ROUTE_META[view]) view = 'dashboard';
    closeSidebar();
    if (location.hash !== `#/${view}`) {
      location.hash = `#/${view}`;
    } else {
      ui.view = view;
      closeModal();
      render();
    }
  }

  function goFilter(filter) {
    ui.taskFilter = filter;
    closeModal();
    if (ui.view === 'tasks') render();
    else navigate('tasks');
  }

  function closeSidebar() {
    document.body.classList.remove('sidebar-open');
  }

  function toggleSidebar() {
    document.body.classList.toggle('sidebar-open');
  }

  function showToast(message, options = {}) {
    if (!toastRoot) return;
    const title = options.title || '已保存';
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-mark">${icon(options.icon || 'check')}</div>
      <div class="toast-copy">
        <strong>${esc(title)}</strong>
        <p>${esc(message)}</p>
      </div>
      <button class="toast-close" type="button" data-action="close-toast" aria-label="关闭提示">×</button>
    `;
    toastRoot.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('is-leaving');
      setTimeout(() => toast.remove(), 220);
    }, options.duration || 4200);
  }

  function openModal(html) {
    modalRoot.innerHTML = `<div class="modal-overlay" data-action="modal-overlay">${html}</div>`;
    document.body.classList.add('modal-open');
    const firstInput = modalRoot.querySelector('input:not([type="hidden"]), textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 80);
  }

  function closeModal() {
    modalRoot.innerHTML = '';
    document.body.classList.remove('modal-open');
    ui.confirmCallback = null;
    ui.returnProjectId = '';
  }

  function projectOptions(selected = '', emptyLabel = '收件箱') {
    return `<option value="">${esc(emptyLabel)}</option>${state.projects.map((project) => `<option value="${project.id}" ${project.id === selected ? 'selected' : ''}>${esc(project.name)}</option>`).join('')}`;
  }

  function sectionOptions(projectId, selected = '') {
    const project = projectById(projectId);
    if (!project || !project.sections.length) return '<option value="">未设置分区</option>';
    return `<option value="">未设置分区</option>${project.sections.map((section) => `<option value="${section.id}" ${section.id === selected ? 'selected' : ''}>${esc(section.name)}</option>`).join('')}`;
  }

  function tagInputValue(item) {
    return (item.tagIds || []).map((id) => tagById(id)).filter(Boolean).map((tag) => tag.name).join(', ');
  }

  function tagChipHTML(tag) {
    return `<span class="tag colored" style="--tag-color:${tag.color};--tag-bg:${hexToRgba(tag.color, 0.1)}">${esc(tag.name)}</span>`;
  }

  function renderTaskItem(task, options = {}) {
    const project = projectById(task.projectId);
    const tags = tagsForTask(task);
    const overdue = isOverdue(task);
    const scheduled = task.scheduledDate ? `${formatMD(task.scheduledDate)}${task.startTime ? ` ${task.startTime}` : ''}` : '';
    const due = task.due && task.due !== task.scheduledDate ? `截止 ${formatMD(task.due)}` : '';
    const search = [task.title, project ? project.name : '', ...tags.map((tag) => tag.name)].join(' ').toLowerCase();
    const statusClass = task.status === 'done' ? 'is-done' : task.status === 'doing' ? 'is-doing' : '';
    const meta = [];
    if (project) meta.push(`<span class="task-meta-item"><span class="dot" style="--dot-color:${project.color}"></span>${esc(project.name)}</span>`);
    if (scheduled) meta.push(`<span class="task-meta-item ${overdue ? 'overdue' : ''}">${icon('clock')}${scheduled}</span>`);
    if (due) meta.push(`<span class="task-meta-item ${overdue ? 'overdue' : ''}">${icon('calendar')}${due}</span>`);
    if (options.rich && tags.length) meta.push(`<span class="task-tags">${tags.slice(0, 3).map(tagChipHTML).join('')}</span>`);
    if (task.priority === 3) meta.push('<span class="pill pill-amber">高优先</span>');
    return `<div class="task-item ${statusClass} ${options.rich ? 'task-item-rich' : ''}" data-action="edit-task" data-id="${task.id}" data-search="${escAttr(search)}" role="button" tabindex="0">
      <button class="task-check" type="button" data-action="toggle-task" data-id="${task.id}" aria-label="${task.status === 'done' ? '取消完成' : '标记完成'}">${icon('check')}</button>
      <div class="task-body">
        <div class="task-title">${esc(task.title)}</div>
        <div class="task-meta">${meta.join('')}</div>
      </div>
      <div class="task-side">
        ${task.status === 'todo' ? `<button class="task-start" type="button" data-action="start-task" data-id="${task.id}">开始</button>` : ''}
        ${task.status === 'doing' ? '<span class="status-line">进行中</span>' : ''}
      </div>
    </div>`;
  }

  function renderTaskGroups(tasks, options = {}) {
    const groups = [
      { key: 'doing', label: '进行中' },
      { key: 'todo', label: '待办' },
      { key: 'done', label: '已完成' }
    ];
    return groups.map((group) => {
      const list = tasks.filter((task) => task.status === group.key);
      if (!list.length) return '';
      return `<div class="task-group-label">${group.label} · ${list.length}</div>${list.map((task) => renderTaskItem(task, options)).join('')}`;
    }).join('');
  }

  function renderHeatmap(days = 84) {
    const start = addDaysKey(startOfWeekKey(todayKey()), -7 * 11);
    const cells = Array.from({ length: days }, (_, index) => addDaysKey(start, index));
    return `<div class="heatmap-wrap">
      <div class="heatmap" aria-label="睡眠时长热力图">
        ${cells.map((key) => {
          const day = state.days[key];
          const minutes = day ? sleepMinutes(day) : 0;
          let level = '';
          if (minutes > 0) {
            if (minutes < 360) level = 'l1';
            else if (minutes < 420) level = 'l2';
            else if (minutes < 510) level = 'l3';
            else level = 'l4';
          }
          const label = minutes ? `${formatDateShort(key)} · ${formatDuration(minutes)}` : `${formatDateShort(key)} · 未记录`;
          return `<span class="heat-cell ${level} ${key === todayKey() ? 'today' : ''}" title="${escAttr(label)}"></span>`;
        }).join('')}
      </div>
    </div>
    <div class="heat-foot">
      <span>${formatMD(cells[0])} 至今</span>
      <span class="heat-scale"><span>短</span><i style="background:#dbe6df"></i><i style="background:#b9cfc0"></i><i style="background:#83a592"></i><i style="background:#4c6b5d"></i><span>足</span></span>
    </div>`;
  }

  function renderBarChart(series, valueFormatter = (value) => value) {
    const max = Math.max(...series.map((item) => Number(item.value) || 0), 1);
    return `<div class="bar-chart">${series.map((item) => {
      const value = Number(item.value) || 0;
      const height = value > 0 ? Math.max(4, Math.round((value / max) * 100)) : 0;
      return `<div class="bar-col" title="${escAttr(`${item.label} · ${valueFormatter(value)}`)}">
        <div class="bar-track"><span class="bar-fill" style="height:${height}%"></span></div>
        <span class="bar-value">${value > 0 ? esc(valueFormatter(value)) : ''}</span>
        <span class="bar-label ${item.today ? 'today' : ''}">${esc(item.shortLabel || item.label)}</span>
      </div>`;
    }).join('')}</div>`;
  }

  function studyWeekSeries() {
    return weekKeys().map((key, index) => ({
      label: formatDateShort(key),
      shortLabel: WEEKDAYS[index],
      today: key === todayKey(),
      value: studyTotalForDate(key)
    }));
  }

  function weeklyCompletionSeries(count = 8) {
    const currentStart = startOfWeekKey(todayKey());
    const series = [];
    for (let index = count - 1; index >= 0; index -= 1) {
      const start = addDaysKey(currentStart, -7 * index);
      const end = addDaysKey(start, 6);
      const tasks = state.tasks.filter((task) => task.status !== 'cancelled'
        && taskDates(task).some((date) => date >= start && date <= end));
      const done = tasks.filter(isDone).length;
      series.push({
        label: formatMD(start),
        shortLabel: formatMD(start).replace(/^0/, ''),
        today: index === 0,
        value: tasks.length ? Math.round((done / tasks.length) * 100) : 0
      });
    }
    return series;
  }

  function weeklyStudySeries(count = 8) {
    const currentStart = startOfWeekKey(todayKey());
    const series = [];
    for (let index = count - 1; index >= 0; index -= 1) {
      const start = addDaysKey(currentStart, -7 * index);
      const end = addDaysKey(start, 6);
      series.push({
        label: formatMD(start),
        shortLabel: formatMD(start).replace(/^0/, ''),
        today: index === 0,
        value: studyTotalBetween(start, end)
      });
    }
    return series;
  }

  function projectProgressHTML(project, options = {}) {
    const stats = getProjectStats(project);
    return `<div class="project-row">
      <div class="project-row-top">
        <div class="project-name"><span class="dot" style="--dot-color:${project.color}"></span>${esc(project.name)}</div>
        <span class="project-pct">${stats.value}%</span>
      </div>
      <div class="progress thin"><span style="width:${stats.value}%"></span></div>
      <div class="project-meta-line">
        <span>${stats.done} / ${stats.total} 项任务${stats.manual !== null ? ' · 手动进度' : ''}</span>
        ${project.deadline ? `<span>${formatMD(project.deadline)}</span>` : (options.showType ? `<span>${PROJECT_TYPES[project.type]}</span>` : '')}
      </div>
      ${options.sections && stats.sections.length ? `<div class="section-bars">${stats.sections.map((section) => `<div class="section-bar-row"><span>${esc(section.name)}</span><div class="progress"><span style="width:${section.progress}%"></span></div><span>${section.progress}%</span></div>`).join('')}</div>` : ''}
    </div>`;
  }

  const views = {};

  views.dashboard = function dashboardView() {
    const week = getWeekStats();
    const today = todayKey();
    const day = peekDay(today);
    const todayTasks = tasksForDate(today).filter(isOpen);
    const activeProjects = state.projects.filter((project) => !project.archived).slice(0, 4);
    const habits = habitSummary(day);
    const watermark = state.settings.character.enabled ? `
      <div class="mentor-card">
        <div class="mentor-top">
          <div class="mentor-avatar" data-action="view-avatar" role="button" tabindex="0" aria-label="查看督导形象">${avatarMarkup()}</div>
          <div class="mentor-id">
            <strong>${esc(mentorName())}</strong>
            <span>今日督导 · 本地角色</span>
          </div>
          <button class="mentor-refresh" type="button" data-action="mentor-refresh" aria-label="换一句话">${icon('refresh')}</button>
        </div>
        <p class="mentor-line">${esc(mentorMessage())}</p>
        <div class="mentor-foot">可以在设置里更换名字与性格</div>
      </div>` : `
      <div class="mentor-card">
        <div class="mentor-top">
          <div class="mentor-avatar">静</div>
          <div class="mentor-id"><strong>安静模式</strong><span>督导已隐藏</span></div>
        </div>
        <p class="mentor-line">把每一格填满不是目的，知道自己在往哪里走才是。</p>
        <div class="mentor-foot">在设置里重新打开督导</div>
      </div>`;
    return `
      <section class="mentor-hero">
        <svg class="hero-art" viewBox="0 0 220 220" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
          <path d="M183 23c-43 7-81 30-103 65-19 30-20 59-8 86 27-15 47-35 60-60 15-28 24-58 51-91Z"/>
          <path d="M177 34c-21 28-39 58-55 90-12 24-24 46-45 64"/>
          <path d="M154 55c4 13 2 26-6 37M127 77c5 13 4 26-3 38M101 108c3 11 1 21-6 31M78 139c2 8 0 16-5 24"/>
          <circle cx="70" cy="176" r="29"/>
          <circle cx="70" cy="176" r="43"/>
        </svg>
        <div class="hero-main">
          <p class="eyebrow">${formatDateLong(today)}</p>
          <h2>${esc(greetingWord())}${state.settings.character.address ? `，<em>${esc(state.settings.character.address)}</em>` : '。'}</h2>
          <p class="hero-lead">${week.tasks.length ? `本周有 ${week.tasks.length} 件事，完成了 ${week.done.length} 件。把注意力放回今天。` : '工作台还是一张白纸。先写下一件真正想完成的事。'}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#/today">进入今天 ${icon('arrow')}</a>
            <button class="btn btn-ghost" type="button" data-action="new-task" data-date="${today}">${icon('plus')} 添加任务</button>
          </div>
        </div>
        ${watermark}
      </section>

      <div class="kpi-grid">
        ${kpiCard('本周待办', week.open.length, '项', `${week.done.length} 项已完成`, 'week', 'list', '#4c6b5d', '#dfe9e2')}
        ${kpiCard('进行中', state.tasks.filter((task) => task.status === 'doing').length, '项', week.open.length ? `本周还有 ${week.open.length} 项待办` : '目前没有待办', 'doing', 'play', '#78929c', '#e3ebee')}
        ${kpiCard('本周逾期', week.overdue.length, '项', `累计 ${getOverallStats().overdue} 项逾期`, 'weekOverdue', 'alert', '#a46057', '#f3e4e1')}
        ${kpiCardValue('本周完成率', `${week.rate}`, '%', `完成 ${week.done.length} / ${week.tasks.length} 项`, 'week', 'target', '#b08a5d', '#f3eadc', week.rate)}
      </div>

      <div class="dash-grid">
        <div class="dash-main">
          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('sun')} 今日安排</h2>
                <p class="card-sub">${todayTasks.length ? `${todayTasks.length} 件待办 · 先挑一件开始` : '今天还没有安排'}</p>
              </div>
              <a class="card-link" href="#/tasks">全部任务 →</a>
            </div>
            ${todayTasks.length
              ? `<div class="task-list">${todayTasks.slice(0, 7).map((task) => renderTaskItem(task)).join('')}</div>`
              : `<div class="empty-state"><span class="empty-mark">${icon('plus')}</span><p>给今天留一个轻一点的开头。</p><button class="btn btn-soft btn-sm" type="button" data-action="new-task" data-date="${today}">添加今天的任务</button></div>`}
          </section>

          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('target')} 项目进度</h2>
                <p class="card-sub">按任务条数计算 · 可在设置中调整目标</p>
              </div>
              <a class="card-link" href="#/projects">管理项目 →</a>
            </div>
            ${activeProjects.length
              ? `<div class="project-list">${activeProjects.map((project) => projectProgressHTML(project, { showType: true })).join('')}</div>`
              : `<div class="empty-state"><span class="empty-mark">${icon('folder')}</span><p>先建立一个项目，把学习、考试或生活放进去。</p><button class="btn btn-soft btn-sm" type="button" data-action="new-project">新建项目</button></div>`}
          </section>
        </div>

        <div class="dash-side">
          <section class="card">
            <div class="habit-head">
              <div class="habit-ring" style="--p:${habits.rate}"><span>${habits.done}/${habits.total}</span></div>
              <div class="habit-head-copy">
                <strong>今日状态</strong>
                <small>${habits.rate >= 80 ? '今天照顾得很好。' : '不用全做到，先做一件。'}</small>
              </div>
              <a class="card-link" href="#/today">记录 →</a>
            </div>
            <div class="habit-rows">
              <div class="habit-row">
                <span class="habit-label">${icon('leaf')}心情</span>
                <div class="habit-control">${moodButtons(day, today, 'small')}</div>
              </div>
              <div class="habit-row">
                <span class="habit-label">${icon('droplet')}喝水</span>
                <div class="habit-control">
                  <span class="water-cups">${waterCups(day, 8)}</span>
                  <span class="counter"><button type="button" data-action="water-add" data-date="${today}" aria-label="喝一杯水">+</button>${day.water}/${day.waterGoal}</span>
                </div>
              </div>
              <div class="habit-row">
                <span class="habit-label">${icon('utensils')}饮食</span>
                <div class="habit-control">${mealButtons(day, today, 'small')}</div>
              </div>
              <div class="habit-row">
                <span class="habit-label">${icon('dumbbell')}运动</span>
                <div class="habit-control">${day.exercise.minutes ? `<span class="pill pill-green">${day.exercise.type ? esc(day.exercise.type) : '运动'} · ${day.exercise.minutes} 分</span>` : `<a class="text-btn" href="#/today">去记录</a>`}</div>
              </div>
              <div class="habit-row">
                <span class="habit-label">${icon('shower')}洗澡</span>
                <div class="habit-control"><button class="mini-toggle ${day.shower ? 'active' : ''}" type="button" data-action="shower-toggle" data-date="${today}">${day.shower ? '已洗' : '未打卡'}</button></div>
              </div>
              <div class="habit-row">
                <span class="habit-label">${icon('bookOpen')}单词</span>
                <div class="habit-control"><span class="counter"><button type="button" data-action="vocab-add" data-date="${today}" data-delta="-5" aria-label="减少单词">−</button>${day.vocab}/${day.vocabGoal}<button type="button" data-action="vocab-add" data-date="${today}" data-delta="5" aria-label="增加单词">+</button></span></div>
              </div>
              <div class="habit-row">
                <span class="habit-label">${icon('moon')}睡眠</span>
                <div class="habit-control"><span class="counter">${sleepMinutes(day) ? formatDurationShort(sleepMinutes(day)) : '未记录'}</span></div>
              </div>
            </div>
            <div class="habit-more"><span>每日至少两餐</span><a href="#/today">打开今日记录 →</a></div>
          </section>
        </div>
      </div>

      <div class="dash-bottom">
        <section class="card">
          <div class="card-head">
            <div class="card-head-main">
              <h2 class="card-title">${icon('clock')} 学习时长</h2>
              <p class="card-sub">本周 · 手动记录</p>
            </div>
            <a class="card-link" href="#/study">记录学习 →</a>
          </div>
          <div class="study-total"><strong>${formatDurationShort(studyTotalBetween(week.start, week.end)).replace(' ', ' ')}</strong><span>本周累计</span></div>
          ${renderBarChart(studyWeekSeries(), (value) => `${value}m`)}
          <div class="habit-more"><span>今日 ${formatDuration(studyTotalForDate(today))}</span><a href="#/study">补记一笔 →</a></div>
        </section>

        <section class="card">
          <div class="card-head">
            <div class="card-head-main">
              <h2 class="card-title">${icon('moon')} 睡眠热力图</h2>
              <p class="card-sub">最近 12 周 · 越深表示睡得越足</p>
            </div>
            <a class="card-link" href="#/today">记录睡眠 →</a>
          </div>
          <div class="sleep-head">
            <div class="sleep-avg"><strong>${sleepAverage(7) ? (sleepAverage(7) / 60).toFixed(1) : '—'}</strong><span>小时 / 近 7 日均值</span></div>
            <div class="sleep-legend">少 <i class="heat-cell l1"></i><i class="heat-cell l2"></i><i class="heat-cell l3"></i><i class="heat-cell l4"></i> 多</div>
          </div>
          ${renderHeatmap(84)}
        </section>
      </div>`;
  };

  function kpiCard(label, value, unit, meta, filter, iconName, color, wash) {
    return `<button class="kpi-card" type="button" data-action="go-filter" data-filter="${filter}" style="--kpi-color:${color};--kpi-wash:${wash}">
      <span class="kpi-top">${esc(label)}<span class="kpi-icon">${icon(iconName)}</span></span>
      <span class="kpi-value">${esc(value)}<span class="unit">${esc(unit)}</span></span>
      <span class="kpi-meta">${esc(meta)}</span>
    </button>`;
  }

  function kpiCardValue(label, value, unit, meta, filter, iconName, color, wash, rate) {
    return `<button class="kpi-card" type="button" data-action="go-filter" data-filter="${filter}" style="--kpi-color:${color};--kpi-wash:${wash}">
      <span class="kpi-top">${esc(label)}<span class="kpi-icon">${icon(iconName)}</span></span>
      <span class="kpi-value">${esc(value)}<span class="unit">${esc(unit)}</span></span>
      <span class="kpi-mini-progress"><span style="width:${clamp(rate, 0, 100)}%"></span></span>
      <span class="kpi-meta">${esc(meta)}</span>
    </button>`;
  }

  function moodFace(value) {
    const eyes = '<circle cx="9.2" cy="9.5" r=".75" fill="currentColor"/><circle cx="14.8" cy="9.5" r=".75" fill="currentColor"/>';
    const mouth = {
      1: '<path d="M9 16.1c1.2-2.1 4.8-2.1 6 0"/>',
      2: '<path d="M9.2 16h5.6"/>',
      3: '<path d="M9 15.2h6"/>',
      4: '<path d="M9 14.3c1 1.9 5 1.9 6 0"/>',
      5: '<path d="M8.7 13.8c1.1 2.9 5.5 2.9 6.6 0"/>'
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/>${eyes}${mouth[value] || mouth[3]}</svg>`;
  }

  function moodButtons(day, dateKeyValue, size = 'small') {
    const moods = [
      [1, '低落'], [2, '疲惫'], [3, '平常'], [4, '不错'], [5, '很好']
    ];
    return `<div class="mood-picker ${size === 'large' ? 'mood-large' : ''}">${moods.map(([value, label]) => `<button class="mood-btn ${Number(day.mood) === value ? 'active' : ''}" type="button" data-action="mood-set" data-date="${dateKeyValue}" data-mood="${value}" title="${label}" aria-label="${label}">${moodFace(value)}</button>`).join('')}</div>`;
  }

  function waterCups(day, max = 8) {
    const count = clamp(Number(day.water) || 0, 0, max);
    return Array.from({ length: max }, (_, index) => `<span class="water-cup ${index < count ? 'filled' : ''}"></span>`).join('');
  }

  function mealButtons(day, dateKeyValue, size = 'small') {
    const meals = [['breakfast', '早'], ['lunch', '午'], ['dinner', '晚']];
    return `<div class="meal-group ${size === 'large' ? 'meal-large' : ''}">${meals.map(([key, label]) => `<button class="meal-btn ${day.meals && day.meals[key] ? 'active' : ''}" type="button" data-action="meal-toggle" data-date="${dateKeyValue}" data-meal="${key}">${label}</button>`).join('')}</div>`;
  }

  views.today = function todayView() {
    const key = ui.dayDate;
    const day = peekDay(key);
    const tasks = tasksForDate(key);
    const habits = habitSummary(day);
    const sessions = state.studySessions.filter((session) => session.date === key);
    const sleep = sleepMinutes(day);
    const today = todayKey();
    return `
      <div class="today-header">
        <div>
          <div class="today-date-title">${formatDateLong(key)}</div>
          <div class="today-date-sub">${key === today ? '今天' : todayLabel(key)} · 所有内容自动保存</div>
        </div>
        <div class="today-nav">
          <button class="btn btn-ghost btn-sm" type="button" data-action="day-prev">${icon('left')} 前一天</button>
          <button class="btn btn-ghost btn-sm" type="button" data-action="day-today">回到今天</button>
          <button class="btn btn-ghost btn-sm" type="button" data-action="day-next">后一天 ${icon('right')}</button>
        </div>
      </div>

      <div class="today-layout">
        <div class="today-col">
          <section class="card today-summary">
            <div class="habit-ring" style="--p:${habits.rate}"><span>${habits.done}/${habits.total}</span></div>
            <div class="today-summary-copy">
              <h2>${habits.rate >= 80 ? '今天照顾得很好。' : habits.rate > 0 ? '已经做了一些，不错。' : '从一件小事开始就好。'}</h2>
              <p>不要求每一项都完成，记录本身也算一种照顾。</p>
              <div class="habit-badges">${habits.items.map((item) => `<span class="habit-badge ${item.done ? 'done' : ''}">${item.label}</span>`).join('')}</div>
            </div>
          </section>

          <section class="card day-tasks-card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('list')} 当天任务</h2>
                <p class="card-sub">${tasks.length ? `${tasks.filter(isOpen).length} 件待办` : '还没有安排'}</p>
              </div>
              <button class="btn btn-soft btn-sm" type="button" data-action="new-task" data-date="${key}">${icon('plus')} 添加</button>
            </div>
            ${tasks.length ? `<div class="task-list">${tasks.map((task) => renderTaskItem(task, { rich: true })).join('')}</div>` : `<div class="empty-state day-task-empty"><span class="empty-mark">${icon('leaf')}</span><p>这一天暂时空着。也不错。</p></div>`}
          </section>

          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('leaf')} 今天的心情</h2>
                <p class="card-sub">不需要解释，先记下来。</p>
              </div>
            </div>
            ${moodButtons(day, key, 'large')}
            <div class="mood-note">
              <textarea data-day-field="moodNote" data-date="${key}" rows="2" placeholder="想写一句也可以，不写也没关系。">${esc(day.moodNote)}</textarea>
            </div>
          </section>

          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('edit')} 今日留白</h2>
                <p class="card-sub">一句话日记、临时想法，或者明天想记得的事。</p>
              </div>
            </div>
            <textarea class="note-field" data-day-field="note" data-date="${key}" rows="4" placeholder="今天有什么值得留下的？">${esc(day.note)}</textarea>
          </section>
        </div>

        <div class="today-col">
          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('droplet')} 身体</h2>
                <p class="card-sub">喝水、吃饭、动一动。</p>
              </div>
            </div>
            <div class="water-large">
              <div class="water-big">${day.water}<span> / ${day.waterGoal} 杯</span></div>
              <div class="water-track">${waterCups(day, 8)}</div>
              <button class="btn btn-soft btn-sm" type="button" data-action="water-add" data-date="${key}">+ 一杯</button>
            </div>
            <div class="habit-row" style="margin-top:10px">
              <span class="habit-label">${icon('utensils')}饮食</span>
              <div class="habit-control">${mealButtons(day, key, 'large')}</div>
            </div>
            <div class="habit-row">
              <span class="habit-label">${icon('dumbbell')}运动</span>
              <div class="habit-control exercise-row">
                <input type="text" data-day-field="exercise.type" data-date="${key}" value="${escAttr(day.exercise.type)}" placeholder="散步、跑步、健身…">
                <input type="number" min="0" max="600" data-day-field="exercise.minutes" data-date="${key}" value="${Number(day.exercise.minutes) || ''}" placeholder="分钟">
              </div>
            </div>
            <div class="habit-row">
              <span class="habit-label">${icon('shower')}洗澡</span>
              <div class="habit-control"><button class="mini-toggle ${day.shower ? 'active' : ''}" type="button" data-action="shower-toggle" data-date="${key}">${day.shower ? '今天洗过了' : '还没洗'}</button></div>
            </div>
            <div class="habit-row">
              <span class="habit-label">${icon('utensils')}饮食备注</span>
              <div class="habit-control"><input type="text" data-day-field="mealNote" data-date="${key}" value="${escAttr(day.mealNote)}" placeholder="吃了什么，可选"></div>
            </div>
          </section>

          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('bookOpen')} 单词与学习</h2>
                <p class="card-sub">手动记录，不用计时器。</p>
              </div>
              <a class="card-link" href="#/study">学习页 →</a>
            </div>
            <div class="habit-row" style="border-top:0">
              <span class="habit-label">${icon('bookOpen')}单词</span>
              <div class="habit-control">
                <span class="counter"><button type="button" data-action="vocab-add" data-date="${key}" data-delta="-5">−</button>${day.vocab}/${day.vocabGoal}<button type="button" data-action="vocab-add" data-date="${key}" data-delta="5">+</button></span>
              </div>
            </div>
            <div class="habit-row">
              <span class="habit-label">${icon('clock')}今日</span>
              <div class="habit-control"><span class="pill pill-green">${formatDuration(studyTotalForDate(key))}</span></div>
            </div>
            ${sessions.length ? `<div class="study-mini-list">${sessions.slice(0, 4).map((session) => {
              const project = projectById(session.projectId);
              return `<div class="study-mini-item"><span class="dot" style="--dot-color:${project ? project.color : '#4c6b5d'}"></span><strong>${esc(project ? project.name : '未归类')}</strong><small>${session.minutes} 分钟</small><button class="icon-only" type="button" data-action="delete-session" data-id="${session.id}" aria-label="删除">${icon('trash')}</button></div>`;
            }).join('')}</div>` : '<div class="habit-more"><span>今天还没有学习记录</span><a href="#/study">去记一笔 →</a></div>'}
          </section>

          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('moon')} 睡眠</h2>
                <p class="card-sub">上床和起床时间，自动算时长。</p>
              </div>
              <div class="sleep-duration"><strong id="sleepDurationValue">${sleep ? formatDurationShort(sleep) : '—'}</strong><span>睡眠</span></div>
            </div>
            <div class="form-grid">
              <div class="field">
                <label>上床时间</label>
                <input type="time" data-day-field="sleep.bed" data-date="${key}" value="${escAttr(day.sleep.bed)}">
              </div>
              <div class="field">
                <label>起床时间</label>
                <input type="time" data-day-field="sleep.wake" data-date="${key}" value="${escAttr(day.sleep.wake)}">
              </div>
            </div>
            <p class="field-hint" style="margin-top:10px">跨过午夜也可以，例如 23:30 到 07:00。</p>
          </section>
        </div>
      </div>`;
  };

  views.tasks = function tasksView() {
    const list = filteredTasks();
    const overall = getOverallStats();
    const week = getWeekStats();
    return `
      <div class="page-toolbar">
        <div class="segmented">
          ${taskFilterButton('all', '全部')}
          ${taskFilterButton('today', '今天')}
          ${taskFilterButton('week', '本周')}
          ${taskFilterButton('weekOverdue', '本周逾期')}
          ${taskFilterButton('overdue', '累计逾期')}
          ${taskFilterButton('doing', '进行中')}
          ${taskFilterButton('done', '已完成')}
        </div>
        <div class="page-toolbar-spacer"></div>
        <div class="search-box">${icon('search')}<input id="taskSearch" type="search" placeholder="搜索任务…" autocomplete="off"></div>
      </div>
      <form class="quick-add" data-form="quick-task">
        <input name="title" type="text" placeholder="写下一件要做的事…" autocomplete="off" required>
        <input name="due" type="date">
        <select name="projectId">${projectOptions('', '收件箱')}</select>
        <button class="btn btn-primary" type="submit">${icon('plus')} 添加</button>
      </form>
      <div class="page-toolbar">
        <select class="mini-select" id="taskProjectFilter">
          <option value="all" ${ui.taskProjectFilter === 'all' ? 'selected' : ''}>全部项目</option>
          <option value="inbox" ${ui.taskProjectFilter === 'inbox' ? 'selected' : ''}>收件箱</option>
          ${state.projects.map((project) => `<option value="${project.id}" ${ui.taskProjectFilter === project.id ? 'selected' : ''}>${esc(project.name)}</option>`).join('')}
        </select>
        <select class="mini-select" id="taskTagFilter">
          <option value="all" ${ui.taskTagFilter === 'all' ? 'selected' : ''}>全部标签</option>
          ${state.tags.map((tag) => `<option value="${tag.id}" ${ui.taskTagFilter === tag.id ? 'selected' : ''}>${esc(tag.name)}</option>`).join('')}
        </select>
        <span class="small muted">${list.length} 项结果</span>
      </div>
      <div class="task-page-layout">
        <section class="card task-list-card">
          <div class="task-list-head"><strong>${filterLabel(ui.taskFilter)}</strong><span>·</span><span>${list.filter(isOpen).length} 项未完成</span></div>
          ${list.length ? renderTaskGroups(list, { rich: true }) : `<div class="empty-state filter-empty"><span class="empty-mark">${icon('leaf')}</span><p>这个筛选下暂时没有任务。换个条件，或者加一件新的事。</p></div>`}
        </section>
        <aside class="card task-side-card">
          <div class="card-head">
            <div class="card-head-main">
              <h2 class="card-title">${icon('chart')} 任务概览</h2>
              <p class="card-sub">本周与累计</p>
            </div>
          </div>
          <div class="task-side-stat"><span>全部任务</span><strong>${overall.total}</strong></div>
          <div class="task-side-stat"><span>已完成</span><strong>${overall.done}</strong></div>
          <div class="task-side-stat"><span>本周完成率</span><strong>${week.rate}%</strong></div>
          <div class="task-side-stat"><span>本周逾期</span><strong>${week.overdue.length}</strong></div>
          <div class="task-side-stat"><span>累计逾期</span><strong>${overall.overdue}</strong></div>
        </aside>
      </div>`;
  };

  function taskFilterButton(key, label) {
    return `<button type="button" class="${ui.taskFilter === key ? 'active' : ''}" data-action="set-task-filter" data-filter="${key}">${label}</button>`;
  }

  function filterLabel(key) {
    return { all: '全部任务', today: '今天', week: '本周', weekOverdue: '本周逾期', overdue: '累计逾期', doing: '进行中', done: '已完成' }[key] || '全部任务';
  }

  function filteredTasks() {
    const today = todayKey();
    const weekStart = startOfWeekKey(today);
    const weekEnd = endOfWeekKey(today);
    let list = state.tasks.filter((task) => task.status !== 'cancelled');
    if (ui.taskFilter === 'today') list = list.filter((task) => taskDates(task).includes(today));
    else if (ui.taskFilter === 'week') list = list.filter((task) => taskDates(task).some((date) => date >= weekStart && date <= weekEnd));
    else if (ui.taskFilter === 'weekOverdue') list = list.filter((task) => isOverdue(task) && task.due >= weekStart && task.due <= weekEnd);
    else if (ui.taskFilter === 'overdue') list = list.filter((task) => isOverdue(task));
    else if (ui.taskFilter === 'doing') list = list.filter((task) => task.status === 'doing');
    else if (ui.taskFilter === 'done') list = list.filter(isDone);
    if (ui.taskProjectFilter === 'inbox') list = list.filter((task) => !task.projectId);
    else if (ui.taskProjectFilter !== 'all') list = list.filter((task) => task.projectId === ui.taskProjectFilter);
    if (ui.taskTagFilter !== 'all') list = list.filter((task) => (task.tagIds || []).includes(ui.taskTagFilter));
    return list.sort(taskSort);
  }

  views.calendar = function calendarView() {
    const cursor = ui.calendarCursor;
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7;
    const start = new Date(year, month, 1 - offset);
    const cells = Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
    return `
      <div class="page-toolbar">
        <div class="calendar-month" style="margin:0">${formatMonth(cursor)}</div>
        <div class="calendar-nav">
          <button class="icon-btn" type="button" data-action="cal-prev" aria-label="上个月">${icon('left')}</button>
          <button class="btn btn-ghost btn-sm" type="button" data-action="cal-today">本月</button>
          <button class="icon-btn" type="button" data-action="cal-next" aria-label="下个月">${icon('right')}</button>
        </div>
        <div class="page-toolbar-spacer"></div>
        <button class="btn btn-primary btn-sm" type="button" data-action="new-task" data-date="${todayKey()}">${icon('plus')} 新任务</button>
      </div>
      <section class="card calendar-card">
        <div class="calendar-toolbar">
          <h2 class="calendar-month">${year}年 ${MONTHS[month]}</h2>
          <span class="pill">${state.tasks.filter((task) => task.status !== 'cancelled' && taskDates(task).some((key) => key.startsWith(`${year}-${pad2(month + 1)}`))).length} 项任务</span>
        </div>
        <div class="calendar-wrap">
          <div class="calendar-weekdays">${WEEKDAYS.map((day) => `<span>${day}</span>`).join('')}</div>
          <div class="calendar-grid">
            ${cells.map((date) => {
              const key = dateKey(date);
              const tasks = tasksForDate(key);
              const outside = date.getMonth() !== month;
              return `<div class="cal-day ${outside ? 'outside' : ''} ${key === todayKey() ? 'today' : ''}" data-action="open-day" data-date="${key}">
                <div class="cal-day-head"><span class="cal-day-num">${date.getDate()}</span><span class="cal-day-count">${tasks.length ? `${tasks.length} 项` : ''}</span></div>
                ${tasks.slice(0, 3).map((task) => {
                  const project = projectById(task.projectId);
                  return `<div class="cal-task ${task.status === 'done' ? 'done' : ''}" style="--dot-color:${project ? project.color : '#4c6b5d'}"><span class="dot" style="--dot-color:${project ? project.color : '#4c6b5d'}"></span>${esc(task.title)}</div>`;
                }).join('')}
                ${tasks.length > 3 ? `<div class="cal-more">还有 ${tasks.length - 3} 项</div>` : ''}
              </div>`;
            }).join('')}
          </div>
        </div>
        <div class="calendar-legend">
          <span class="legend-item"><span class="dot"></span>任务</span>
          <span class="legend-item">点击日期查看当天安排</span>
          <span class="legend-item">${ui.taskFilter === 'all' ? '本周从周一开始' : ''}</span>
        </div>
      </section>`;
  };

  views.week = function weekView() {
    const cursor = ui.weekCursor;
    const start = startOfWeekKey(dateKey(cursor));
    const end = endOfWeekKey(dateKey(cursor));
    const days = weekKeys(dateKey(cursor));
    const scheduled = state.tasks.filter((task) => task.status !== 'cancelled' && task.startTime
      && timelineDate(task, start, end));
    const unscheduled = state.tasks.filter((task) => isOpen(task) && !task.startTime
      && taskDates(task).some((date) => date >= start && date <= end));
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const showNow = days.includes(todayKey()) && nowMinutes >= 360 && nowMinutes < 1440;
    return `
      <div class="week-toolbar">
        <div class="week-range">${formatWeekRange(start, end)}</div>
        <div class="calendar-nav">
          <button class="icon-btn" type="button" data-action="week-prev" aria-label="上一周">${icon('left')}</button>
          <button class="btn btn-ghost btn-sm" type="button" data-action="week-today">本周</button>
          <button class="icon-btn" type="button" data-action="week-next" aria-label="下一周">${icon('right')}</button>
        </div>
        <div class="toolbar-right">
          <button class="btn btn-soft btn-sm" type="button" data-action="new-task">${icon('plus')} 新任务</button>
        </div>
      </div>
      <div class="week-layout">
        <section class="week-panel">
          <div class="week-scroll">
            <div class="week-head">
              <div class="week-gutter-head"></div>
              <div class="week-day-heads">
                ${days.map((key) => {
                  const date = parseDateKey(key);
                  return `<div class="week-day-head ${key === todayKey() ? 'today' : ''}">
                    <div class="week-day-name">周${WEEKDAYS[(date.getDay() + 6) % 7]}</div>
                    <div class="week-day-num">${date.getDate()}</div>
                  </div>`;
                }).join('')}
              </div>
            </div>
            <div class="week-body">
              <div class="time-gutter">
                ${Array.from({ length: 18 }, (_, index) => `<div class="time-label">${pad2(index + 6)}:00</div>`).join('')}
              </div>
              <div class="week-columns">
                ${days.map((key) => {
                  const dayTasks = scheduled.filter((task) => timelineDate(task, start, end) === key);
                  return `<div class="week-col" data-action="week-slot" data-date="${key}">
                    ${dayTasks.map((task) => weekTaskHTML(task)).join('')}
                    ${key === todayKey() && showNow ? `<div class="now-line" style="top:${((nowMinutes - 360) / 60) * 48}px"></div>` : ''}
                  </div>`;
                }).join('')}
              </div>
            </div>
          </div>
        </section>
        <aside class="week-side">
          <div>
            <h3>本周待排期</h3>
            <p>${unscheduled.length ? `${unscheduled.length} 件事还没有放进时间轴` : '都安排好了。'}</p>
          </div>
          <div class="unscheduled-list">
            ${unscheduled.slice(0, 8).map((task) => {
              const project = projectById(task.projectId);
              return `<button class="unscheduled-item" type="button" data-action="edit-task" data-id="${task.id}">
                <span class="dot" style="--dot-color:${project ? project.color : '#4c6b5d'}"></span>
                <span>${esc(task.title)}</span>
                <small>${taskDates(task).length ? formatMD(taskDates(task)[0]) : '无日期'}</small>
              </button>`;
            }).join('') || '<div class="empty-state" style="min-height:80px;padding:14px"><p>本周没有待排期的任务。</p></div>'}
          </div>
          <div class="week-hint">${icon('info')} 点击空白时间格，可以按半小时为粒度添加任务；点击任务可调整时间。</div>
          <button class="btn btn-ghost btn-sm" type="button" data-action="new-task">${icon('plus')} 添加任务</button>
        </aside>
      </div>`;
  };

  function weekTaskHTML(task) {
    const project = projectById(task.projectId);
    const color = project ? project.color : '#4c6b5d';
    const start = timeToMinutes(task.startTime) ?? 540;
    const end = timeToMinutes(task.endTime) ?? start + Math.max(30, Number(task.estimate) || 60);
    const duration = Math.max(20, end - start);
    const top = Math.max(0, ((start - 360) / 60) * 48);
    const height = Math.max(22, (duration / 60) * 48 - 2);
    const time = `${task.startTime}${task.endTime ? `–${task.endTime}` : ''}`;
    return `<button class="week-task ${task.status === 'done' ? 'done' : ''} ${isOverdue(task) ? 'overdue' : ''}" type="button" data-action="edit-task" data-id="${task.id}" style="top:${top}px;height:${height}px;--task-color:${color};--task-bg:${hexToRgba(color, 0.14)}" title="${escAttr(`${task.title} · ${time}`)}">
      <strong>${esc(task.title)}</strong><small>${esc(time)}${project ? ` · ${esc(project.name)}` : ''}</small>
    </button>`;
  }

  views.study = function studyView() {
    const today = todayKey();
    const week = getWeekStats();
    const sessions = [...state.studySessions].sort((a, b) => b.date.localeCompare(a.date) || String(b.createdAt).localeCompare(String(a.createdAt)));
    const studyProjects = state.projects.filter((project) => !project.archived && (project.type === 'study' || project.type === 'exam'));
    const allMinutes = state.studySessions.reduce((sum, session) => sum + Number(session.minutes || 0), 0);
    return `
      <section class="study-hero">
        <div class="study-hero-main">
          <p class="eyebrow">Study Log</p>
          <h2>学习不是一场计时赛。</h2>
          <p>只要记下真实发生的时间，趋势就会慢慢出现。</p>
        </div>
        <div class="study-hero-stats">
          <div class="study-hero-stat"><strong>${formatDurationShort(studyTotalBetween(week.start, week.end))}</strong><span>本周</span></div>
          <div class="study-hero-stat"><strong>${formatDurationShort(studyTotalForDate(today))}</strong><span>今天</span></div>
          <div class="study-hero-stat"><strong>${studyStreak()}</strong><span>连续天数</span></div>
        </div>
      </section>

      <div class="study-layout">
        <div class="study-col">
          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('clock')} 记一笔学习</h2>
                <p class="card-sub">手动填写，三十秒就能完成。</p>
              </div>
            </div>
            <form class="study-form" data-form="study">
              <div class="field">
                <label>日期</label>
                <input type="date" name="date" value="${today}" required>
              </div>
              <div class="field">
                <label>科目 / 项目</label>
                <select name="projectId">${projectOptions('', '未归类')}</select>
              </div>
              <div class="field">
                <label>时长（分钟）</label>
                <input id="studyMinutes" type="number" name="minutes" min="1" max="1440" placeholder="30" required>
                <div class="study-presets">
                  <button type="button" data-action="study-preset" data-minutes="30">30</button>
                  <button type="button" data-action="study-preset" data-minutes="60">60</button>
                  <button type="button" data-action="study-preset" data-minutes="90">90</button>
                </div>
              </div>
              <button class="btn btn-primary" type="submit">${icon('plus')} 记录</button>
              <div class="field full" style="grid-column:1/-1">
                <input type="text" name="note" placeholder="备注，可选。比如：听力精听 Section 2">
              </div>
            </form>
          </section>

          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('chart')} 本周分布</h2>
                <p class="card-sub">每天一点点，也算在走。</p>
              </div>
            </div>
            ${renderBarChart(studyWeekSeries(), (value) => `${value}m`)}
          </section>

          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('list')} 最近记录</h2>
                <p class="card-sub">共 ${formatDuration(allMinutes)}</p>
              </div>
            </div>
            ${sessions.length ? `<div class="study-sessions">${sessions.slice(0, 18).map((session) => {
              const project = projectById(session.projectId);
              return `<div class="study-session">
                <span class="session-date">${formatMD(session.date)}</span>
                <div class="session-main"><strong>${esc(project ? project.name : '未归类')}</strong><small>${esc(session.note || '没有备注')}</small></div>
                <span class="session-minutes">${session.minutes}<span> 分</span></span>
                <button class="icon-only" type="button" data-action="delete-session" data-id="${session.id}" aria-label="删除学习记录">${icon('trash')}</button>
              </div>`;
            }).join('')}</div>` : `<div class="empty-state"><span class="empty-mark">${icon('bookOpen')}</span><p>还没有学习记录。今天先记十分钟也可以。</p></div>`}
          </section>
        </div>

        <div class="study-col">
          <section class="card">
            <div class="card-head">
              <div class="card-head-main">
                <h2 class="card-title">${icon('target')} 学习目标</h2>
                <p class="card-sub">目标拆分到分区和任务。</p>
              </div>
              <button class="btn btn-ghost btn-sm" type="button" data-action="new-project">${icon('plus')} 新项目</button>
            </div>
            ${studyProjects.length ? studyProjects.map((project) => {
              const stats = getProjectStats(project);
              return `<div class="goal-card">
                <div class="goal-top">
                  <span class="dot" style="--dot-color:${project.color}"></span>
                  <h3>${esc(project.name)}</h3>
                  ${project.target ? `<span class="goal-target">${esc(project.target)}</span>` : ''}
                </div>
                <div class="goal-meta">
                  <span>${PROJECT_TYPES[project.type]}</span>
                  <span>${stats.done} / ${stats.total} 任务</span>
                  ${project.deadline ? `<span>目标日 ${formatMD(project.deadline)}</span>` : ''}
                </div>
                ${stats.sections.length ? `<div class="goal-sections">${stats.sections.map((section) => `<div class="goal-section-row"><span>${esc(section.name)}</span><div class="progress"><span style="width:${section.progress}%"></span></div><span>${section.progress}%</span></div>`).join('')}</div>` : '<p class="goal-empty">还没有设置分区。编辑项目，把目标拆成听力、阅读、写作、口语，或者你自己的阶段。</p>'}
                <div class="form-actions" style="padding-top:12px;margin-top:12px">
                  <button class="text-btn" type="button" data-action="open-project" data-id="${project.id}">打开项目 →</button>
                  <span class="spacer"></span>
                  <button class="btn btn-soft btn-sm" type="button" data-action="new-task" data-project="${project.id}">${icon('plus')} 任务</button>
                  <button class="btn btn-ghost btn-sm" type="button" data-action="edit-project" data-id="${project.id}">编辑目标</button>
                </div>
              </div>`;
            }).join('') : `<div class="empty-state"><span class="empty-mark">${icon('target')}</span><p>还没有学习项目。新建一个，把大目标拆小。</p><button class="btn btn-soft btn-sm" type="button" data-action="new-project">新建项目</button></div>`}
          </section>
        </div>
      </div>`;
  };

  views.projects = function projectsView() {
    const projects = state.projects.filter((project) => !project.archived
      && (ui.projectTagFilter === 'all' || (project.tagIds || []).includes(ui.projectTagFilter)));
    return `
      <div class="page-toolbar">
        <span class="small muted">${projects.length} 个项目 · 用标签给它们分类</span>
        <div class="page-toolbar-spacer"></div>
        <select class="mini-select" id="projectTagFilter">
          <option value="all" ${ui.projectTagFilter === 'all' ? 'selected' : ''}>全部标签</option>
          ${state.tags.map((tag) => `<option value="${tag.id}" ${ui.projectTagFilter === tag.id ? 'selected' : ''}>${esc(tag.name)}</option>`).join('')}
        </select>
        <button class="btn btn-primary btn-sm" type="button" data-action="new-project">${icon('plus')} 新建项目</button>
      </div>
      <div class="project-grid">
        ${projects.length ? projects.map((project) => {
          const stats = getProjectStats(project);
          const tags = (project.tagIds || []).map(tagById).filter(Boolean);
          return `<article class="project-card" style="--project-color:${project.color}" data-action="open-project" data-id="${project.id}" role="button" tabindex="0">
            <div class="project-card-head">
              <div class="project-card-icon">${esc(project.name.slice(0, 1))}</div>
              <div><h3>${esc(project.name)}</h3><div class="project-kind">${PROJECT_TYPES[project.type]}${project.target ? ` · 目标 ${esc(project.target)}` : ''}</div></div>
              <button class="icon-only" type="button" data-action="edit-project" data-id="${project.id}" aria-label="编辑项目">${icon('edit')}</button>
            </div>
            <div class="project-card-meta">${tags.length ? tags.map(tagChipHTML).join('') : '<span class="tag">未加标签</span>'}${project.deadline ? `<span class="tag">${formatMD(project.deadline)} 截止</span>` : ''}</div>
            <div class="project-card-progress">
              <div class="project-card-progress-head"><span>${stats.done} / ${stats.total} 项任务</span><strong>${stats.value}%</strong></div>
              <div class="progress"><span style="width:${stats.value}%"></span></div>
            </div>
            ${stats.sections.length ? `<div class="project-card-sections">${stats.sections.map((section) => `<div class="project-section-mini"><span>${esc(section.name)}</span><div class="progress"><span style="width:${section.progress}%"></span></div><span>${section.progress}%</span></div>`).join('')}</div>` : ''}
            <div class="project-card-foot"><span>${stats.tasks.filter(isOpen).length} 项待办</span><span>·</span><span>${stats.total ? '进行中' : '还没有任务'}</span><span class="spacer" style="flex:1"></span><button class="text-btn" type="button" data-action="new-task" data-project="${project.id}">+ 任务</button><button class="text-btn" type="button" data-action="open-project" data-id="${project.id}">打开 →</button></div>
          </article>`;
        }).join('') : `<div class="empty-state projects-empty"><span class="empty-mark">${icon('folder')}</span><p>先建立一个项目，把学习、雅思、生活或任何长期目标放进去。</p><button class="btn btn-soft btn-sm" type="button" data-action="new-project">新建项目</button></div>`}
      </div>`;
  };

  views.stats = function statsView() {
    const overall = getOverallStats();
    const week = getWeekStats();
    const allMinutes = state.studySessions.reduce((sum, session) => sum + Number(session.minutes || 0), 0);
    const sleep7 = sleepAverage(7);
    const recordedDays = Object.values(state.days).filter((day) => {
      return day.mood || day.water || day.shower || day.vocab || sleepMinutes(day) || (day.meals && Object.values(day.meals).some(Boolean));
    }).length;
    const habitRows = [
      { label: '两餐', count: lastNDays(30).filter((key) => { const day = state.days[key]; return day && ['breakfast', 'lunch', 'dinner'].filter((meal) => day.meals && day.meals[meal]).length >= 2; }).length, total: 30 },
      { label: '喝水', count: lastNDays(30).filter((key) => { const day = state.days[key]; return day && Number(day.water) >= Number(day.waterGoal || 8); }).length, total: 30 },
      { label: '洗澡', count: lastNDays(30).filter((key) => state.days[key] && state.days[key].shower).length, total: 30 },
      { label: '单词', count: lastNDays(30).filter((key) => state.days[key] && Number(state.days[key].vocab) > 0).length, total: 30 },
      { label: '睡眠', count: lastNDays(30).filter((key) => state.days[key] && sleepMinutes(state.days[key]) > 0).length, total: 30 },
      { label: '心情', count: lastNDays(30).filter((key) => state.days[key] && state.days[key].mood).length, total: 30 }
    ];
    return `
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-card-label">全部任务</div><div class="stat-card-value">${overall.total}<span> 项</span></div><div class="stat-card-note">未取消的任务</div></div>
        <div class="stat-card"><div class="stat-card-label">总完成率</div><div class="stat-card-value">${overall.rate}<span> %</span></div><div class="stat-card-note">已完成 ${overall.done} 项</div></div>
        <div class="stat-card"><div class="stat-card-label">累计逾期</div><div class="stat-card-value">${overall.overdue}<span> 项</span></div><div class="stat-card-note">当前仍未完成</div></div>
        <div class="stat-card"><div class="stat-card-label">本周完成率</div><div class="stat-card-value">${week.rate}<span> %</span></div><div class="stat-card-note">${week.done.length} / ${week.tasks.length} 项</div></div>
        <div class="stat-card"><div class="stat-card-label">学习总时长</div><div class="stat-card-value">${formatDurationShort(allMinutes)}</div><div class="stat-card-note">手动记录累计</div></div>
        <div class="stat-card"><div class="stat-card-label">近 7 日睡眠</div><div class="stat-card-value">${sleep7 ? (sleep7 / 60).toFixed(1) : '—'}<span> 小时</span></div><div class="stat-card-note">平均每晚</div></div>
      </div>
      <div class="stats-layout">
        <section class="card chart-card">
          <div class="card-head">
            <div class="card-head-main"><h2 class="card-title">${icon('target')} 近 8 周完成率</h2><p class="card-sub">本周逾期只统计本周到期且已过期的任务。</p></div>
          </div>
          ${renderBarChart(weeklyCompletionSeries(8), (value) => `${value}%`)}
          <div class="chart-legend"><span><i class="legend-swatch"></i>完成率</span><span>当前周在右侧</span></div>
        </section>
        <section class="card chart-card">
          <div class="card-head">
            <div class="card-head-main"><h2 class="card-title">${icon('clock')} 近 8 周学习</h2><p class="card-sub">按周汇总手动记录的学习时长。</p></div>
          </div>
          ${renderBarChart(weeklyStudySeries(8), (value) => formatDurationShort(value))}
          <div class="chart-legend"><span><i class="legend-swatch blue"></i>学习时长</span><span>总计 ${formatDuration(allMinutes)}</span></div>
        </section>
        <section class="card">
          <div class="card-head">
            <div class="card-head-main"><h2 class="card-title">${icon('leaf')} 近 30 天习惯</h2><p class="card-sub">不是连续打卡，只是看看频率。</p></div>
          </div>
          <div class="habit-stat-list">
            ${habitRows.map((row) => `<div class="habit-stat-row"><span>${row.label}</span><div class="progress"><span style="width:${Math.round(row.count / row.total * 100)}%"></span></div><span>${row.count}/${row.total}</span></div>`).join('')}
          </div>
        </section>
        <section class="card">
          <div class="card-head">
            <div class="card-head-main"><h2 class="card-title">${icon('moon')} 睡眠概览</h2><p class="card-sub">最近 7 日平均 ${sleep7 ? formatDuration(sleep7) : '还没有足够记录'}。</p></div>
          </div>
          <div class="sleep-avg"><strong>${sleep7 ? (sleep7 / 60).toFixed(1) : '—'}</strong><span>小时 / 7 日均值</span></div>
          <div style="margin-top:12px">${renderHeatmap(84)}</div>
        </section>
      </div>
      <div class="stats-note">统计口径：完成率按任务条数计算；本周逾期只算本周内到期且已过期的任务；累计逾期包含所有过去到期仍未完成的任务。记录天数：${recordedDays} 天。</div>`;
  };

  views.settings = function settingsView() {
    const character = state.settings.character;
    const reminders = state.settings.reminders;
    return `
      <div class="settings-layout">
        <div class="settings-col">
          <section class="settings-card">
            <div class="card-head">
              <div class="card-head-main"><h2 class="card-title">${icon('sparkle')} 督导角色</h2><p class="card-sub">名字、称呼和说话方式都由你决定。文案由本地状态和模板生成，不是 AI，也不会上传。</p></div>
              <button class="text-btn" type="button" data-action="view-avatar">查看形象</button>
              <label class="toggle"><input type="checkbox" data-setting="character.enabled" ${character.enabled ? 'checked' : ''} aria-label="显示督导角色"></label>
            </div>
            ${characterPreviewHTML()}
            <div class="character-grid">
              <div class="field"><label>督导名字</label><input type="text" maxlength="20" data-setting="character.name" value="${escAttr(character.name)}" placeholder="比如：沈砚"></div>
              <div class="field"><label>怎么称呼你</label><input type="text" maxlength="12" data-setting="character.address" value="${escAttr(character.address)}" placeholder="留空就不称呼"></div>
              <div class="field"><label>说话风格</label><select data-setting="character.tone">${Object.entries(TONE_LABELS).map(([key, label]) => `<option value="${key}" ${character.tone === key ? 'selected' : ''}>${label}</option>`).join('')}</select></div>
              <div class="field"><label>监督强度</label><select data-setting="character.strictness"><option value="1" ${String(character.strictness) === '1' ? 'selected' : ''}>安静陪伴</option><option value="2" ${String(character.strictness) === '2' ? 'selected' : ''}>温和提醒</option><option value="3" ${String(character.strictness) === '3' ? 'selected' : ''}>多盯一点</option></select></div>
              <div class="field full"><label>自定义开场白</label><textarea data-setting="character.greeting" rows="2" placeholder="留空则根据任务、喝水、睡眠等状态自动生成。">${esc(character.greeting)}</textarea></div>
            </div>
          </section>

          <section class="settings-card">
            <div class="card-head"><div class="card-head-main"><h2>提醒</h2><p class="card-sub">仅页面打开时有效。时间可以随时改。</p></div></div>
            <div class="setting-row">
              <div class="setting-copy"><strong>喝水</strong><small>默认每 2 小时提醒一次，已喝够就跳过。</small></div>
              <label class="toggle"><input type="checkbox" data-setting="reminders.water.enabled" ${reminders.water.enabled ? 'checked' : ''}></label>
            </div>
            <div class="setting-row">
              <div class="setting-copy"><strong>提醒时段</strong><small>从开始到结束，按间隔提醒。</small></div>
              <input type="time" data-setting="reminders.water.start" value="${escAttr(reminders.water.start)}">
              <span class="muted small">到</span>
              <input type="time" data-setting="reminders.water.end" value="${escAttr(reminders.water.end)}">
              <select data-setting="reminders.water.every">${[60, 90, 120, 180].map((minutes) => `<option value="${minutes}" ${String(reminders.water.every) === String(minutes) ? 'selected' : ''}>每 ${minutes / 60} 小时</option>`).join('')}</select>
            </div>
            <div class="setting-row">
              <div class="setting-copy"><strong>洗澡</strong><small>默认 21:00。</small></div>
              <input type="time" data-setting="reminders.shower.time" value="${escAttr(reminders.shower.time)}">
              <label class="toggle"><input type="checkbox" data-setting="reminders.shower.enabled" ${reminders.shower.enabled ? 'checked' : ''}></label>
            </div>
            <div class="setting-row">
              <div class="setting-copy"><strong>背单词</strong><small>默认 20:30。</small></div>
              <input type="time" data-setting="reminders.vocab.time" value="${escAttr(reminders.vocab.time)}">
              <label class="toggle"><input type="checkbox" data-setting="reminders.vocab.enabled" ${reminders.vocab.enabled ? 'checked' : ''}></label>
            </div>
            <div class="setting-row">
              <div class="setting-copy"><strong>三餐</strong><small>到点提醒；已经打卡的那一餐会跳过。</small></div>
              <label class="toggle"><input type="checkbox" data-setting="reminders.meals.enabled" ${reminders.meals && reminders.meals.enabled ? 'checked' : ''}></label>
            </div>
            ${[['breakfast', '早餐', '08:00'], ['lunch', '午餐', '12:00'], ['dinner', '晚餐', '18:30']].map(([key, label, fallback]) => {
              const meal = (reminders.meals && reminders.meals[key]) || { enabled: true, time: fallback };
              return `<div class="setting-row">
                <div class="setting-copy"><strong>${label}</strong><small>${label}时间</small></div>
                <input type="time" data-setting="reminders.meals.${key}.time" value="${escAttr(meal.time || fallback)}">
                <label class="toggle"><input type="checkbox" data-setting="reminders.meals.${key}.enabled" ${meal.enabled ? 'checked' : ''}></label>
              </div>`;
            }).join('')}
            <div class="data-actions">
              <button class="btn btn-ghost btn-sm" type="button" data-action="test-reminder">${icon('bell')} 预览喝水提醒</button>
            </div>
          </section>

          <section class="settings-card">
            <div class="card-head"><div class="card-head-main"><h2>标签</h2><p class="card-sub">给项目和任务分类，颜色只是帮助识别。</p></div></div>
            <div class="tag-manager">${state.tags.length ? state.tags.map((tag) => `<span class="tag-chip" style="--tag-color:${tag.color};--tag-bg:${hexToRgba(tag.color, 0.1)}">${esc(tag.name)}<button type="button" data-action="delete-tag" data-id="${tag.id}" aria-label="删除标签">×</button></span>`).join('') : '<span class="small muted">还没有标签。</span>'}</div>
            <form class="tag-add-form" data-form="tag">
              <input type="text" name="name" maxlength="12" placeholder="新标签，比如：雅思" required>
              <input type="color" name="color" value="#78929c" aria-label="标签颜色">
              <button class="btn btn-soft btn-sm" type="submit">添加</button>
            </form>
          </section>
        </div>

        <div class="settings-col">
          <section class="settings-card">
            <div class="card-head"><div class="card-head-main"><h2>每日目标</h2><p class="card-sub">只影响新一天的默认值。</p></div></div>
            <div class="setting-row"><div class="setting-copy"><strong>喝水目标</strong><small>每天几杯水。</small></div><input type="number" min="1" max="30" data-setting="waterGoal" value="${state.settings.waterGoal}"><span class="muted small">杯</span></div>
            <div class="setting-row"><div class="setting-copy"><strong>单词目标</strong><small>每天背多少个。</small></div><input type="number" min="1" max="500" data-setting="vocabGoal" value="${state.settings.vocabGoal}"><span class="muted small">个</span></div>
          </section>

          <section class="settings-card">
            <div class="card-head"><div class="card-head-main"><h2>数据与备份</h2><p class="card-sub">浏览器里自动保存；建议每周另存一份到 D 盘。</p></div></div>
            <div class="backup-stamp">上次备份：${formatTimestamp(state.settings.lastBackup)}</div>
            <div class="data-actions">
              <button class="btn btn-primary btn-sm" type="button" data-action="save-backup-as">${icon('download')} 备份到指定位置</button>
              <button class="btn btn-soft btn-sm" type="button" data-action="export-data">${icon('download')} 下载 JSON</button>
              <button class="btn btn-soft btn-sm" type="button" data-action="import-data">${icon('upload')} 导入备份</button>
              <button class="btn btn-danger btn-sm" type="button" data-action="reset-data">${icon('trash')} 清空数据</button>
            </div>
            <p class="data-note" style="margin-top:12px">浏览器里的工作台数据只是很小的文本，通常只有几 MB，不会把 C 盘撑满。它保存在浏览器自己的配置目录里；如果要放到 D 盘，请用「备份到指定位置」选择 D 盘文件夹。建议每周或每次大量整理后备份一次。JSON 不会自动同步，GitHub Pages 也不会看到你的数据。</p>
          </section>

          <section class="settings-card">
            <div class="card-head"><div class="card-head-main"><h2>关于</h2><p class="card-sub">${APP_NAME} · 本地优先的个人工作台</p></div></div>
            <p class="data-note">第一版没有账号、没有服务器、没有计时器。你的内容保存在当前浏览器里；清理浏览器数据或换浏览器前，请先导出 JSON。提醒只在页面打开时工作。若部署到 GitHub Pages，手机可访问同一个网页，但手机和电脑的数据各自独立。</p>
            <div class="data-actions"><span class="pill">v${APP_VERSION}</span><span class="pill">本地存储</span><span class="pill">无追踪</span></div>
          </section>
        </div>
      </div>`;
  };

  // Modal and interaction helpers continue below.

  function openTaskModal(taskId = null, defaults = {}) {
    const existing = taskId ? taskById(taskId) : null;
    const task = existing ? { ...existing } : normalizeTask({
      id: uid('task'),
      title: '',
      status: 'todo',
      priority: 2,
      estimate: 60,
      ...defaults
    });
    openModal(`<div class="modal">
      <div class="modal-head">
        <div class="modal-head-copy">
          <h2>${existing ? '编辑任务' : '新任务'}</h2>
          <p>任务会同步出现在月历、周视图和首页。</p>
        </div>
        <button class="modal-close" type="button" data-action="close-modal" aria-label="关闭">×</button>
      </div>
      <form data-form="task" data-id="${existing ? existing.id : ''}">
        <div class="modal-body">
          <div class="form-grid">
            <div class="field full"><label>任务标题</label><input name="title" type="text" value="${escAttr(task.title)}" placeholder="比如：精听 Section 2" maxlength="200" required></div>
            <div class="field"><label>项目</label><select name="projectId" id="taskProject" data-role="task-project">${projectOptions(task.projectId, '收件箱')}</select></div>
            <div class="field"><label>分区</label><select name="sectionId" id="taskSection">${sectionOptions(task.projectId, task.sectionId)}</select></div>
            <div class="field"><label>截止日期</label><input name="due" type="date" value="${escAttr(task.due)}"></div>
            <div class="field"><label>计划日期</label><input name="scheduledDate" type="date" value="${escAttr(task.scheduledDate)}"></div>
            <div class="field"><label>开始时间</label><input name="startTime" type="time" value="${escAttr(task.startTime)}"></div>
            <div class="field"><label>结束时间</label><input name="endTime" type="time" value="${escAttr(task.endTime)}"></div>
            <div class="field"><label>状态</label><select name="status">${Object.entries(STATUS).filter(([key]) => key !== 'cancelled').map(([key, label]) => `<option value="${key}" ${task.status === key ? 'selected' : ''}>${label}</option>`).join('')}</select></div>
            <div class="field"><label>优先级</label><select name="priority">${Object.entries(PRIORITY).map(([key, label]) => `<option value="${key}" ${String(task.priority) === key ? 'selected' : ''}>${label}</option>`).join('')}</select></div>
            <div class="field"><label>预计时长（分钟）</label><input name="estimate" type="number" min="5" max="1440" value="${escAttr(task.estimate)}"></div>
            <div class="field full"><label>标签</label><input name="tags" type="text" value="${escAttr(tagInputValue(task))}" placeholder="用逗号分隔，比如：英语, 本周重点"><span class="field-hint">新标签会自动创建，可在设置里删除。</span></div>
            <div class="field full"><label>备注</label><textarea name="notes" rows="3" placeholder="补充说明、资料链接，或者下一步动作。">${esc(task.notes)}</textarea></div>
          </div>
        </div>
        <div class="modal-footer">
          ${existing ? `<button class="btn btn-danger btn-sm" type="button" data-action="delete-task" data-id="${existing.id}">${icon('trash')} 删除</button>` : ''}
          <span class="spacer"></span>
          <button class="btn btn-ghost btn-sm" type="button" data-action="close-modal">取消</button>
          <button class="btn btn-primary btn-sm" type="submit">${existing ? '保存修改' : '添加任务'}</button>
        </div>
      </form>
    </div>`);
  }

  function openProjectModal(projectId = null) {
    const existing = projectId ? projectById(projectId) : null;
    const project = existing || {
      id: uid('proj'), name: '', type: 'study', color: '#4c6b5d', description: '',
      target: '', deadline: '', tagIds: [], sections: [], manualProgress: null
    };
    const sectionsText = (project.sections || []).map((section) => `${section.name} | ${section.weight}`).join('\n');
    openModal(`<div class="modal">
      <div class="modal-head">
        <div class="modal-head-copy">
          <h2>${existing ? '编辑项目' : '新建项目'}</h2>
          <p>项目可以是一个科目、一场考试，也可以是一件长期想做的事。</p>
        </div>
        <button class="modal-close" type="button" data-action="close-modal" aria-label="关闭">×</button>
      </div>
      <form data-form="project" data-id="${existing ? existing.id : ''}">
        <div class="modal-body">
          <div class="form-grid">
            <div class="field"><label>项目名称</label><input name="name" type="text" value="${escAttr(project.name)}" placeholder="比如：雅思" maxlength="40" required></div>
            <div class="field"><label>类型</label><select name="type">${Object.entries(PROJECT_TYPES).map(([key, label]) => `<option value="${key}" ${project.type === key ? 'selected' : ''}>${label}</option>`).join('')}</select></div>
            <div class="field"><label>目标</label><input name="target" type="text" value="${escAttr(project.target)}" placeholder="比如：7.0 / 读完 12 本"></div>
            <div class="field"><label>目标日期</label><input name="deadline" type="date" value="${escAttr(project.deadline)}"></div>
            <div class="field"><label>颜色</label><input name="color" type="color" value="${escAttr(project.color)}"></div>
            <div class="field"><label>手动进度（可选）</label><input name="manualProgress" type="number" min="0" max="100" value="${project.manualProgress === null ? '' : project.manualProgress}" placeholder="留空则按任务自动计算"></div>
            <div class="field full"><label>标签</label><input name="tags" type="text" value="${escAttr(tagInputValue(project))}" placeholder="用逗号分隔"></div>
            <div class="field full"><label>分区</label><textarea name="sections" rows="4" placeholder="每行一个分区，用 | 分隔权重，例如：&#10;听力 | 25&#10;阅读 | 25&#10;写作 | 25&#10;口语 | 25">${esc(sectionsText)}</textarea><span class="field-hint">分区用来把目标拆成更小的块，权重只是标记，进度仍按任务条数计算。</span></div>
            <div class="field full"><label>描述</label><textarea name="description" rows="2" placeholder="为什么想做这件事？">${esc(project.description)}</textarea></div>
          </div>
        </div>
        <div class="modal-footer">
          ${existing ? `<button class="btn btn-danger btn-sm" type="button" data-action="delete-project" data-id="${existing.id}">${icon('trash')} 删除项目</button>` : ''}
          <span class="spacer"></span>
          <button class="btn btn-ghost btn-sm" type="button" data-action="close-modal">取消</button>
          <button class="btn btn-primary btn-sm" type="submit">${existing ? '保存修改' : '创建项目'}</button>
        </div>
      </form>
    </div>`);
  }

  function openProjectDetail(projectId) {
    const project = projectById(projectId);
    if (!project) return;
    const stats = getProjectStats(project);
    const sectionGroups = (project.sections || []).map((section) => {
      const sectionStats = stats.sections.find((item) => item.id === section.id);
      return {
        ...section,
        tasks: stats.tasks.filter((task) => task.sectionId === section.id).sort(taskSort),
        done: sectionStats ? sectionStats.done : 0,
        total: sectionStats ? sectionStats.total : 0,
        progress: sectionStats ? sectionStats.progress : 0
      };
    });
    const validSectionIds = new Set((project.sections || []).map((section) => section.id));
    const unassigned = stats.tasks.filter((task) => !task.sectionId || !validSectionIds.has(task.sectionId)).sort(taskSort);
    if (unassigned.length || !sectionGroups.length) {
      sectionGroups.push({ id: '', name: '未分区', tasks: unassigned, done: unassigned.filter(isDone).length, total: unassigned.length, progress: unassigned.length ? Math.round((unassigned.filter(isDone).length / unassigned.length) * 100) : 0 });
    }
    const projectTags = (project.tagIds || []).map(tagById).filter(Boolean);
    openModal(`<div class="modal is-wide" data-project-detail="${project.id}">
      <div class="modal-head project-detail-head">
        <div class="project-detail-avatar" style="--project-color:${project.color}">${esc(project.name.slice(0, 1))}</div>
        <div class="modal-head-copy project-detail-copy">
          <h2>${esc(project.name)}</h2>
          <p>${PROJECT_TYPES[project.type]}${project.target ? ` · 目标 ${esc(project.target)}` : ''}${project.deadline ? ` · ${formatMD(project.deadline)} 截止` : ''}</p>
        </div>
        <div class="project-detail-pct"><strong>${stats.value}%</strong><span>${stats.done} / ${stats.total} 项任务</span></div>
        <button class="modal-close" type="button" data-action="close-modal" aria-label="关闭">×</button>
      </div>
      <div class="modal-body project-detail-body">
        <div class="project-detail-overview">
          <div class="project-detail-progress">
            <div class="progress"><span style="width:${stats.value}%"></span></div>
            <div class="project-detail-meta">
              ${projectTags.length ? projectTags.map(tagChipHTML).join('') : '<span class="tag">未加标签</span>'}
              <span>${stats.tasks.filter(isOpen).length} 项未完成</span>
              ${stats.manual !== null ? '<span class="pill">手动进度</span>' : ''}
            </div>
          </div>
          ${project.description ? `<p class="project-detail-desc">${esc(project.description)}</p>` : ''}
        </div>
        <div class="project-task-sections">
          ${sectionGroups.map((section) => `<section class="project-task-section">
            <div class="project-task-section-head">
              <div><strong>${esc(section.name)}</strong><span>${section.done} / ${section.total} 完成</span></div>
              <div class="project-task-section-progress"><div class="progress thin"><span style="width:${section.progress}%"></span></div><span>${section.progress}%</span></div>
              <button class="btn btn-ghost btn-sm" type="button" data-action="new-task" data-project="${project.id}" data-section="${section.id}">${icon('plus')} 添加</button>
            </div>
            ${section.tasks.length ? `<div class="project-task-list">${section.tasks.map(projectDetailTaskHTML).join('')}</div>` : `<div class="project-task-empty">这里还没有任务，可以从上面添加一件。</div>`}
          </section>`).join('')}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost btn-sm" type="button" data-action="edit-project" data-id="${project.id}">${icon('edit')} 编辑项目</button>
        <span class="spacer"></span>
        <button class="btn btn-ghost btn-sm" type="button" data-action="close-modal">关闭</button>
        <button class="btn btn-primary btn-sm" type="button" data-action="new-task" data-project="${project.id}">${icon('plus')} 添加任务</button>
      </div>
    </div>`);
  }

  function projectDetailTaskHTML(task) {
    const due = task.due ? `截止 ${formatMD(task.due)}` : '';
    const scheduled = task.scheduledDate ? `${formatMD(task.scheduledDate)}${task.startTime ? ` ${task.startTime}` : ''}` : '';
    const meta = [STATUS[task.status], scheduled, due].filter(Boolean).join(' · ');
    return `<div class="project-detail-task ${task.status === 'done' ? 'is-done' : ''}" data-action="edit-task" data-id="${task.id}" role="button" tabindex="0">
      <button class="task-check ${task.status === 'done' ? 'is-done' : ''}" type="button" data-action="toggle-task" data-id="${task.id}" aria-label="${task.status === 'done' ? '取消完成' : '标记完成'}">${icon('check')}</button>
      <div class="project-detail-task-main"><strong>${esc(task.title)}</strong><small>${esc(meta)}</small></div>
      ${task.priority === 3 ? '<span class="pill pill-amber">高优先</span>' : ''}
    </div>`;
  }

  function openAvatarModal() {
    openModal(`<div class="modal is-narrow avatar-modal">
      <div class="modal-head">
        <div class="modal-head-copy"><h2>督导形象</h2><p>书房里的白发绅士 · 温和、可靠、会照顾人的成年男性</p></div>
        <button class="modal-close" type="button" data-action="close-modal" aria-label="关闭">×</button>
      </div>
      <div class="modal-body avatar-modal-body">
        <img class="avatar-large" src="avatar-full.jpg" alt="督导虚拟形象">
        <p>这是你选定的督导形象：白发、细框眼镜、深色马甲，坐在安静的书房里。形象会出现在首页、提醒卡片和设置预览中。</p>
        <div class="data-actions"><span class="pill">用户选定形象</span><span class="pill">本地资源</span><span class="pill">可在设置中改名</span></div>
      </div>
      <div class="modal-footer">
        <span class="spacer"></span>
        <button class="btn btn-ghost btn-sm" type="button" data-action="close-modal">关闭</button>
      </div>
    </div>`);
  }

  function openConfirm({ title, message, confirmLabel = '确认', danger = false, onConfirm }) {
    ui.confirmCallback = onConfirm;
    openModal(`<div class="modal is-narrow">
      <div class="modal-head">
        <div class="modal-head-copy"><h2>${esc(title)}</h2></div>
        <button class="modal-close" type="button" data-action="close-modal" aria-label="关闭">×</button>
      </div>
      <div class="modal-body"><p class="modal-confirm-text">${esc(message)}</p></div>
      <div class="modal-confirm-actions">
        <button class="btn btn-ghost btn-sm" type="button" data-action="close-modal">取消</button>
        <button class="btn ${danger ? 'btn-danger' : 'btn-primary'} btn-sm" type="button" data-action="confirm-ok">${esc(confirmLabel)}</button>
      </div>
    </div>`);
  }

  function openDayModal(key) {
    const tasks = tasksForDate(key);
    openModal(`<div class="modal is-narrow">
      <div class="modal-head">
        <div class="modal-head-copy"><h2>${formatDateLong(key)}</h2><p>${tasks.length ? `${tasks.length} 项安排` : '这一天还没有任务'}</p></div>
        <button class="modal-close" type="button" data-action="close-modal" aria-label="关闭">×</button>
      </div>
      <div class="modal-body">
        <div class="day-modal-list">
          ${tasks.length ? tasks.map((task) => {
            const project = projectById(task.projectId);
            return `<div class="day-modal-task ${task.status === 'done' ? 'is-done' : ''}" data-action="edit-task" data-id="${task.id}">
              <button class="task-check ${task.status === 'done' ? 'is-done' : ''}" type="button" data-action="toggle-task" data-id="${task.id}" aria-label="标记完成">${icon('check')}</button>
              <div class="day-modal-task-main"><strong>${esc(task.title)}</strong><small>${project ? esc(project.name) : '收件箱'}${task.startTime ? ` · ${task.startTime}` : ''}${task.due ? ` · 截止 ${formatMD(task.due)}` : ''}</small></div>
            </div>`;
          }).join('') : '<div class="empty-state" style="min-height:100px"><span class="empty-mark">' + icon('leaf') + '</span><p>空着也很好。如果想加一件事，点击下面。</p></div>'}
        </div>
      </div>
      <div class="modal-footer">
        <span class="spacer"></span>
        <button class="btn btn-ghost btn-sm" type="button" data-action="close-modal">关闭</button>
        <button class="btn btn-primary btn-sm" type="button" data-action="new-task" data-date="${key}">${icon('plus')} 添加任务</button>
      </div>
    </div>`);
  }

  function openImportConfirm(parsed) {
    const normalized = normalizeState(parsed);
    openConfirm({
      title: '导入并替换当前数据？',
      message: `备份中包含 ${normalized.tasks.length} 项任务、${normalized.projects.length} 个项目和 ${Object.keys(normalized.days).length} 天记录。导入后会覆盖当前浏览器里的内容，建议先导出当前数据。`,
      confirmLabel: '导入并替换',
      danger: true,
      onConfirm: () => {
        state = normalized;
        ui.taskFilter = 'all';
        ui.taskTagFilter = 'all';
        ui.projectTagFilter = 'all';
        ui.taskProjectFilter = 'all';
        Object.keys(localStorage).filter((key) => key.startsWith('qiju.reminder.')).forEach((key) => localStorage.removeItem(key));
        saveNow();
        closeModal();
        render();
        showToast('备份已导入，工作台已恢复。', { title: '导入完成' });
      }
    });
  }

  function parseTagInput(value) {
    return [...new Set(String(value || '').split(/[,，;；]/).map((name) => name.trim()).filter(Boolean).map((name) => name.slice(0, 20)))];
  }

  function ensureTags(names) {
    return names.map((name) => {
      const existing = state.tags.find((tag) => tag.name.toLowerCase() === name.toLowerCase());
      if (existing) return existing.id;
      const tag = { id: uid('tag'), name, color: pickTagColor(name) };
      state.tags.push(tag);
      return tag.id;
    });
  }

  function parseSections(text, existing = []) {
    const existingByName = new Map(existing.map((section) => [section.name, section.id]));
    const used = new Set();
    return String(text || '').split(/\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
      const [rawName, rawWeight] = line.split(/[|｜,，]/).map((part) => (part || '').trim());
      const name = (rawName || '').slice(0, 20);
      if (!name || used.has(name)) return null;
      used.add(name);
      return {
        id: existingByName.get(name) || uid('sec'),
        name,
        weight: clamp(Number(rawWeight) || 0, 0, 100)
      };
    }).filter(Boolean);
  }

  function refreshCharacterPreview() {
    const target = document.getElementById('characterPreview');
    if (target) target.outerHTML = characterPreviewHTML();
  }

  function refreshHabitSummaryUI(key) {
    const summary = document.querySelector('.today-summary');
    if (!summary) return;
    const habits = habitSummary(peekDay(key));
    const ring = summary.querySelector('.habit-ring');
    if (ring) {
      ring.style.setProperty('--p', habits.rate);
      const label = ring.querySelector('span');
      if (label) label.textContent = `${habits.done}/${habits.total}`;
    }
    const heading = summary.querySelector('h2');
    if (heading) {
      heading.textContent = habits.rate >= 80 ? '今天照顾得很好。' : habits.rate > 0 ? '已经做了一些，不错。' : '从一件小事开始就好。';
    }
    const badges = summary.querySelector('.habit-badges');
    if (badges) badges.innerHTML = habits.items.map((item) => `<span class="habit-badge ${item.done ? 'done' : ''}">${item.label}</span>`).join('');
  }

  function updateSleepDisplay(key) {
    const target = document.getElementById('sleepDurationValue');
    if (!target) return;
    const day = peekDay(key);
    const minutes = sleepMinutes(day);
    target.textContent = minutes ? formatDurationShort(minutes) : '—';
  }

  function updateSectionOptions() {
    const projectSelect = document.getElementById('taskProject');
    const sectionSelect = document.getElementById('taskSection');
    if (!projectSelect || !sectionSelect) return;
    sectionSelect.innerHTML = sectionOptions(projectSelect.value, '');
  }

  function showReminder(kind, test = false, mealKey = '') {
    const waterEvery = Math.max(30, Number(state.settings.reminders.water.every) || 120);
    const waterDuration = waterEvery >= 60
      ? `${Number((waterEvery / 60).toFixed(1))} 个小时`
      : `${waterEvery} 分钟`;
    const mealInfo = {
      breakfast: { label: '早餐', text: '早上好。先吃点东西，再开始今天。' },
      lunch: { label: '午餐', text: '午饭时间。先放下手里的事，好好吃一顿。' },
      dinner: { label: '晚餐', text: '晚饭时间。今天辛苦了，去吃点热的。' }
    };
    const configs = {
      water: {
        title: '喝水提醒',
        text: `差不多 ${waterDuration}了。起身接杯水，顺便让眼睛离开屏幕一会儿。`,
        action: '喝了一杯',
        icon: 'droplet'
      },
      shower: {
        title: '洗澡提醒',
        text: `${state.settings.reminders.shower.time} 了。去冲个热水澡，把今天的疲惫放下来。`,
        action: '去洗澡',
        icon: 'shower'
      },
      vocab: {
        title: '单词提醒',
        text: `${state.settings.reminders.vocab.time} 了。十分钟单词，背完就休息。`,
        action: '去背单词',
        icon: 'bookOpen'
      }
    };
    let config = configs[kind];
    if (kind === 'meal') {
      const info = mealInfo[mealKey];
      if (!info) return;
      config = {
        title: `${info.label}提醒`,
        text: info.text,
        action: '吃过了',
        icon: 'utensils'
      };
    }
    if (!config) return;
    const cardKey = kind === 'meal' ? `meal-${mealKey}` : kind;
    if (reminderRoot.querySelector(`[data-reminder-kind="${cardKey}"]`)) return;
    const card = document.createElement('div');
    card.className = 'reminder-card';
    card.dataset.reminderKind = cardKey;
    card.innerHTML = `
      <div class="reminder-top">
        <div class="reminder-avatar">${avatarMarkup('reminder-avatar-img')}</div>
        <div class="reminder-copy"><strong>${config.title}${test ? '（预览）' : ''}</strong><small>来自 ${esc(mentorName())}</small></div>
        <button class="reminder-close" type="button" data-action="dismiss-reminder" aria-label="关闭">×</button>
      </div>
      <p>${esc(config.text)}</p>
      <div class="reminder-actions">
        <button class="btn btn-primary btn-sm" type="button" data-action="reminder-action" data-kind="${kind}" data-meal="${esc(mealKey)}">${config.action}</button>
        <button class="btn btn-ghost btn-sm" type="button" data-action="dismiss-reminder">知道了</button>
      </div>`;
    reminderRoot.appendChild(card);
  }

  function reminderFired(date, key) {
    try {
      return localStorage.getItem(`qiju.reminder.${date}.${key}`) === '1';
    } catch (_) {
      return false;
    }
  }

  function markReminderFired(date, key) {
    try {
      localStorage.setItem(`qiju.reminder.${date}.${key}`, '1');
    } catch (_) {
      // 忽略无法写入的提醒标记。
    }
  }

  function checkReminders() {
    const now = new Date();
    const date = todayKey();
    const current = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
    const day = peekDay(date);
    const reminders = state.settings.reminders;
    const waterGoal = Number(day.waterGoal) || 8;

    if (reminders.water.enabled && Number(day.water) < waterGoal) {
      const start = timeToMinutes(reminders.water.start);
      const end = timeToMinutes(reminders.water.end);
      const every = Math.max(30, Number(reminders.water.every) || 120);
      if (start !== null && end !== null && start < end) {
        for (let minute = start; minute <= end; minute += every) {
          const slot = minutesToTime(minute);
          if (slot === current && !reminderFired(date, `water-${slot}`)) {
            markReminderFired(date, `water-${slot}`);
            showReminder('water');
            return;
          }
        }
      }
    }

    const mealConfig = reminders.meals || {};
    if (mealConfig.enabled) {
      const mealOrder = ['breakfast', 'lunch', 'dinner'];
      for (const mealKey of mealOrder) {
        const config = mealConfig[mealKey];
        if (config && config.enabled && !day.meals[mealKey]
          && current === config.time && !reminderFired(date, `meal-${mealKey}`)) {
          markReminderFired(date, `meal-${mealKey}`);
          showReminder('meal', false, mealKey);
          return;
        }
      }
    }

    if (reminders.shower.enabled && !day.shower && current === reminders.shower.time && !reminderFired(date, 'shower')) {
      markReminderFired(date, 'shower');
      showReminder('shower');
      return;
    }

    if (reminders.vocab.enabled && !Number(day.vocab) && current === reminders.vocab.time && !reminderFired(date, 'vocab')) {
      markReminderFired(date, 'vocab');
      showReminder('vocab');
    }
  }

  function exportData() {
    state.settings.lastBackup = new Date().toISOString();
    queueSave();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const stamp = `${todayKey()}-${pad2(new Date().getHours())}${pad2(new Date().getMinutes())}`;
    link.href = url;
    link.download = `qiju-backup-${stamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('备份文件已下载。建议放到网盘或 GitHub 仓库。', { title: '导出完成' });
    if (ui.view === 'settings') render();
  }

  async function saveBackupAs() {
    const payload = JSON.parse(JSON.stringify(state));
    payload.settings.lastBackup = new Date().toISOString();
    const content = JSON.stringify(payload, null, 2);
    if (typeof window.showSaveFilePicker !== 'function') {
      exportData();
      showToast('当前浏览器不支持直接选择保存位置，已改为下载备份。', { title: '使用下载方式' });
      return;
    }
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `qiju-backup-${todayKey()}.json`,
        types: [{ description: '栖居 JSON 备份', accept: { 'application/json': ['.json'] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      state.settings.lastBackup = payload.settings.lastBackup;
      saveNow();
      if (ui.view === 'settings') render();
      showToast('已保存到你选择的位置。建议放在 D 盘独立文件夹，并定期更新。', { title: '备份完成' });
    } catch (error) {
      if (error && error.name === 'AbortError') return;
      console.error('保存备份失败', error);
      showToast('没有保存成功。可以改用「下载 JSON」再移动到目标文件夹。', { title: '备份失败' });
    }
  }

  function triggerImport() {
    if (!importFile) return;
    importFile.value = '';
    importFile.click();
  }

  function handleImportFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed !== 'object' || (!Array.isArray(parsed.tasks) && !Array.isArray(parsed.projects))) {
          throw new Error('不是有效的栖居备份文件');
        }
        openImportConfirm(parsed);
      } catch (error) {
        console.error(error);
        showToast('这个文件无法解析，请确认选择的是导出的 JSON 备份。', { title: '导入失败' });
      }
    };
    reader.onerror = () => showToast('读取文件失败。', { title: '导入失败' });
    reader.readAsText(file);
  }

  function resetData() {
    openConfirm({
      title: '清空全部本地数据？',
      message: '这会删除当前浏览器里的任务、项目、每日记录、睡眠和学习时长，且无法撤销。建议先导出备份。',
      confirmLabel: '确认清空',
      danger: true,
      onConfirm: () => {
        localStorage.removeItem(STORAGE_KEY);
        Object.keys(localStorage).filter((key) => key.startsWith('qiju.reminder.')).forEach((key) => localStorage.removeItem(key));
        state = defaultState();
        saveNow();
        closeModal();
        ui.taskFilter = 'all';
        ui.taskProjectFilter = 'all';
        ui.taskTagFilter = 'all';
        ui.projectTagFilter = 'all';
        ui.dayDate = todayKey();
        render();
        showToast('数据已清空，工作台回到了初始状态。', { title: '已清空' });
      }
    });
  }

  function requestDeleteTask(id) {
    const task = taskById(id);
    if (!task) return;
    openConfirm({
      title: '删除这项任务？',
      message: `“${task.title}”会从任务、月历和周视图中移除。`,
      confirmLabel: '删除任务',
      danger: true,
      onConfirm: () => {
        state.tasks = state.tasks.filter((item) => item.id !== id);
        saveNow();
        closeModal();
        render();
        showToast('任务已删除。', { title: '已删除' });
      }
    });
  }

  function requestDeleteProject(id) {
    const project = projectById(id);
    if (!project) return;
    openConfirm({
      title: '删除这个项目？',
      message: `项目“${project.name}”会被删除，里面的任务会保留在收件箱，但会失去项目归属。`,
      confirmLabel: '删除项目',
      danger: true,
      onConfirm: () => {
        state.projects = state.projects.filter((item) => item.id !== id);
        state.tasks.forEach((task) => {
          if (task.projectId === id) {
            task.projectId = '';
            task.sectionId = '';
          }
        });
        saveNow();
        closeModal();
        render();
        showToast('项目已删除，任务已移入收件箱。', { title: '已删除' });
      }
    });
  }

  function requestDeleteTag(id) {
    const tag = tagById(id);
    if (!tag) return;
    openConfirm({
      title: '删除这个标签？',
      message: `“${tag.name}”会从所有项目和任务上移除，任务本身不会消失。`,
      confirmLabel: '删除标签',
      danger: true,
      onConfirm: () => {
        state.tags = state.tags.filter((item) => item.id !== id);
        state.tasks.forEach((task) => { task.tagIds = (task.tagIds || []).filter((tagId) => tagId !== id); });
        state.projects.forEach((project) => { project.tagIds = (project.tagIds || []).filter((tagId) => tagId !== id); });
        if (ui.taskTagFilter === id) ui.taskTagFilter = 'all';
        if (ui.projectTagFilter === id) ui.projectTagFilter = 'all';
        saveNow();
        closeModal();
        render();
        showToast('标签已删除。', { title: '已删除' });
      }
    });
  }

  function handleTaskSubmit(form) {
    const data = new FormData(form);
    const title = String(data.get('title') || '').trim();
    if (!title) {
      form.querySelector('[name="title"]')?.focus();
      return;
    }
    const existing = form.dataset.id ? taskById(form.dataset.id) : null;
    const projectId = String(data.get('projectId') || '');
    const project = projectById(projectId);
    const sectionId = project && project.sections.some((section) => section.id === data.get('sectionId'))
      ? String(data.get('sectionId') || '')
      : '';
    const status = String(data.get('status') || 'todo');
    const taskData = {
      title,
      notes: String(data.get('notes') || ''),
      projectId,
      sectionId,
      tagIds: ensureTags(parseTagInput(data.get('tags'))),
      status,
      priority: Number(data.get('priority')) || 2,
      due: String(data.get('due') || ''),
      scheduledDate: String(data.get('scheduledDate') || ''),
      startTime: String(data.get('startTime') || ''),
      endTime: String(data.get('endTime') || ''),
      estimate: Number(data.get('estimate')) || 60,
      completedAt: status === 'done' ? (existing && existing.completedAt ? existing.completedAt : new Date().toISOString()) : null
    };
    if (existing) {
      Object.assign(existing, taskData);
    } else {
      state.tasks.unshift(normalizeTask({ ...taskData, createdAt: new Date().toISOString() }));
    }
    const returnProjectId = ui.returnProjectId;
    ui.returnProjectId = '';
    saveNow();
    closeModal();
    render();
    if (returnProjectId) openProjectDetail(returnProjectId);
    showToast(existing ? '任务已更新。' : '任务已加入列表。', { title: existing ? '已保存' : '添加成功' });
  }

  function handleQuickTaskSubmit(form) {
    const data = new FormData(form);
    const title = String(data.get('title') || '').trim();
    if (!title) return;
    state.tasks.unshift(normalizeTask({
      title,
      due: String(data.get('due') || ''),
      projectId: String(data.get('projectId') || ''),
      status: 'todo',
      priority: 2,
      estimate: 60,
      createdAt: new Date().toISOString()
    }));
    saveNow();
    render();
    showToast('已加入任务列表。', { title: '添加成功' });
  }

  function handleProjectSubmit(form) {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    if (!name) {
      form.querySelector('[name="name"]')?.focus();
      return;
    }
    const existing = form.dataset.id ? projectById(form.dataset.id) : null;
    const sections = parseSections(data.get('sections'), existing ? existing.sections : []);
    const manualRaw = String(data.get('manualProgress') || '').trim();
    const projectData = {
      name,
      type: String(data.get('type') || 'study'),
      color: String(data.get('color') || '#4c6b5d'),
      description: String(data.get('description') || ''),
      target: String(data.get('target') || ''),
      deadline: String(data.get('deadline') || ''),
      tagIds: ensureTags(parseTagInput(data.get('tags'))),
      sections,
      manualProgress: manualRaw === '' ? null : clamp(Number(manualRaw) || 0, 0, 100)
    };
    let projectId;
    if (existing) {
      Object.assign(existing, projectData);
      projectId = existing.id;
    } else {
      const created = normalizeProject({ ...projectData, createdAt: new Date().toISOString() });
      state.projects.unshift(created);
      projectId = created.id;
    }
    const validSections = new Set(sections.map((section) => section.id));
    state.tasks.forEach((task) => {
      if (task.projectId === projectId && task.sectionId && !validSections.has(task.sectionId)) task.sectionId = '';
    });
    saveNow();
    closeModal();
    render();
    showToast(existing ? '项目已更新。' : '项目已创建。', { title: existing ? '已保存' : '创建成功' });
  }

  function handleStudySubmit(form) {
    const data = new FormData(form);
    const minutes = Number(data.get('minutes'));
    if (!minutes || minutes < 1) {
      form.querySelector('[name="minutes"]')?.focus();
      return;
    }
    const date = String(data.get('date') || todayKey());
    state.studySessions.unshift({
      id: uid('study'),
      date,
      projectId: String(data.get('projectId') || ''),
      minutes: clamp(minutes, 1, 1440),
      note: String(data.get('note') || '').trim(),
      createdAt: new Date().toISOString()
    });
    saveNow();
    render();
    showToast(`${formatDuration(minutes)} 已记录。`, { title: '学习时长' });
  }

  function handleTagSubmit(form) {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    if (!name) return;
    if (state.tags.some((tag) => tag.name.toLowerCase() === name.toLowerCase())) {
      showToast('这个标签已经存在了。', { title: '没有重复添加' });
      return;
    }
    state.tags.push({ id: uid('tag'), name: name.slice(0, 20), color: String(data.get('color') || pickTagColor(name)) });
    saveNow();
    render();
    showToast('标签已添加。', { title: '已保存' });
  }

  function updateTaskSearch(input) {
    const query = input.value.trim().toLowerCase();
    $$('[data-search]', app).forEach((row) => {
      row.classList.toggle('hidden', Boolean(query) && !row.dataset.search.includes(query));
    });
    $$('.task-group-label', app).forEach((label) => {
      if (!query) {
        label.classList.remove('hidden');
        return;
      }
      let node = label.nextElementSibling;
      let visible = false;
      while (node && !node.classList.contains('task-group-label')) {
        if (node.matches('[data-search]') && !node.classList.contains('hidden')) visible = true;
        node = node.nextElementSibling;
      }
      label.classList.toggle('hidden', !visible);
    });
  }

  function handleSettingField(element) {
    const path = element.dataset.setting;
    if (!path) return;
    let value;
    if (element.type === 'checkbox') value = element.checked;
    else if (element.type === 'number') value = Number(element.value);
    else if (path === 'character.strictness') value = Number(element.value);
    else value = element.value;
    setPath(state.settings, path, value);
    queueSave();
    if (path.startsWith('character.')) refreshCharacterPreview();
  }

  function handleDayField(element) {
    const key = element.dataset.date || ui.dayDate;
    const field = element.dataset.dayField;
    if (!field) return;
    const day = ensureDay(key);
    let value = element.value;
    if (element.type === 'number') value = Math.max(0, Number(value) || 0);
    setPath(day, field, value);
    queueSave();
    if (field === 'sleep.bed' || field === 'sleep.wake') {
      updateSleepDisplay(key);
      refreshHabitSummaryUI(key);
    }
    if (field === 'exercise.minutes') refreshHabitSummaryUI(key);
  }

  function handleClick(event) {
    const actionElement = event.target.closest('[data-action]');
    if (!actionElement) return;
    const action = actionElement.dataset.action;
    if (action === 'modal-overlay' && event.target === actionElement) {
      closeModal();
      return;
    }
    if (action === 'toggle-sidebar') {
      toggleSidebar();
      return;
    }
    if (action === 'close-modal') {
      closeModal();
      return;
    }
    if (action === 'confirm-ok') {
      const callback = ui.confirmCallback;
      ui.confirmCallback = null;
      closeModal();
      if (callback) callback();
      return;
    }
    if (action === 'close-toast') {
      actionElement.closest('.toast')?.remove();
      return;
    }
    if (action === 'dismiss-reminder') {
      actionElement.closest('.reminder-card')?.remove();
      return;
    }
    if (action === 'new-task') {
      const defaults = {};
      if (actionElement.dataset.date) defaults.due = actionElement.dataset.date;
      if (actionElement.dataset.scheduled) defaults.scheduledDate = actionElement.dataset.scheduled;
      if (actionElement.dataset.start) defaults.startTime = actionElement.dataset.start;
      if (actionElement.dataset.end) defaults.endTime = actionElement.dataset.end;
      if (actionElement.dataset.project) defaults.projectId = actionElement.dataset.project;
      if (actionElement.dataset.section) defaults.sectionId = actionElement.dataset.section;
      ui.returnProjectId = actionElement.closest('[data-project-detail]')?.dataset.projectDetail || '';
      openTaskModal(null, defaults);
      return;
    }
    if (action === 'edit-task') {
      const id = actionElement.dataset.id;
      if (id) {
        ui.returnProjectId = actionElement.closest('[data-project-detail]')?.dataset.projectDetail || '';
        openTaskModal(id);
      }
      return;
    }
    if (action === 'toggle-task') {
      const task = taskById(actionElement.dataset.id);
      if (!task) return;
      const detailId = actionElement.closest('[data-project-detail]')?.dataset.projectDetail || '';
      if (task.status === 'done') {
        task.status = 'todo';
        task.completedAt = null;
      } else {
        task.status = 'done';
        task.completedAt = new Date().toISOString();
        showToast(praiseLine(), { title: '完成一件' });
      }
      saveNow();
      if (modalRoot.innerHTML) closeModal();
      render();
      if (detailId) openProjectDetail(detailId);
      return;
    }
    if (action === 'start-task') {
      const task = taskById(actionElement.dataset.id);
      if (!task) return;
      task.status = task.status === 'doing' ? 'todo' : 'doing';
      saveNow();
      render();
      return;
    }
    if (action === 'delete-task') {
      requestDeleteTask(actionElement.dataset.id);
      return;
    }
    if (action === 'go-filter') {
      goFilter(actionElement.dataset.filter || 'all');
      return;
    }
    if (action === 'set-task-filter') {
      ui.taskFilter = actionElement.dataset.filter || 'all';
      render();
      return;
    }
    if (action === 'mentor-refresh') {
      ui.mentorSeed += 1;
      render();
      return;
    }
    if (action === 'water-add') {
      const day = ensureDay(actionElement.dataset.date || ui.dayDate);
      day.water = Math.max(0, Number(day.water) + 1);
      saveNow();
      render();
      return;
    }
    if (action === 'water-remove') {
      const day = ensureDay(actionElement.dataset.date || ui.dayDate);
      day.water = Math.max(0, Number(day.water) - 1);
      saveNow();
      render();
      return;
    }
    if (action === 'mood-set') {
      const day = ensureDay(actionElement.dataset.date || ui.dayDate);
      const mood = Number(actionElement.dataset.mood);
      day.mood = day.mood === mood ? null : mood;
      saveNow();
      render();
      return;
    }
    if (action === 'meal-toggle') {
      const day = ensureDay(actionElement.dataset.date || ui.dayDate);
      const meal = actionElement.dataset.meal;
      day.meals[meal] = !day.meals[meal];
      saveNow();
      render();
      return;
    }
    if (action === 'shower-toggle') {
      const day = ensureDay(actionElement.dataset.date || ui.dayDate);
      day.shower = !day.shower;
      saveNow();
      render();
      return;
    }
    if (action === 'vocab-add') {
      const day = ensureDay(actionElement.dataset.date || ui.dayDate);
      day.vocab = Math.max(0, Number(day.vocab) + Number(actionElement.dataset.delta || 5));
      saveNow();
      render();
      return;
    }
    if (action === 'study-preset') {
      const input = document.getElementById('studyMinutes');
      if (input) {
        input.value = actionElement.dataset.minutes || '';
        input.focus();
      }
      return;
    }
    if (action === 'delete-session') {
      const id = actionElement.dataset.id;
      openConfirm({
        title: '删除这条学习记录？',
        message: '删除后本周学习时长会相应减少。',
        confirmLabel: '删除记录',
        danger: true,
        onConfirm: () => {
          state.studySessions = state.studySessions.filter((session) => session.id !== id);
          saveNow();
          closeModal();
          render();
          showToast('学习记录已删除。', { title: '已删除' });
        }
      });
      return;
    }
    if (action === 'day-prev') {
      ui.dayDate = addDaysKey(ui.dayDate, -1);
      render();
      return;
    }
    if (action === 'day-next') {
      ui.dayDate = addDaysKey(ui.dayDate, 1);
      render();
      return;
    }
    if (action === 'day-today') {
      ui.dayDate = todayKey();
      render();
      return;
    }
    if (action === 'cal-prev' || action === 'cal-next') {
      const delta = action === 'cal-prev' ? -1 : 1;
      ui.calendarCursor = new Date(ui.calendarCursor.getFullYear(), ui.calendarCursor.getMonth() + delta, 1);
      render();
      return;
    }
    if (action === 'cal-today') {
      const now = new Date();
      ui.calendarCursor = new Date(now.getFullYear(), now.getMonth(), 1);
      render();
      return;
    }
    if (action === 'week-prev' || action === 'week-next') {
      const delta = action === 'week-prev' ? -7 : 7;
      const next = new Date(ui.weekCursor);
      next.setDate(next.getDate() + delta);
      ui.weekCursor = next;
      render();
      return;
    }
    if (action === 'week-today') {
      ui.weekCursor = new Date();
      render();
      return;
    }
    if (action === 'week-slot') {
      const rect = actionElement.getBoundingClientRect();
      const y = event.clientY - rect.top;
      let minutes = 360 + Math.floor((y / 48) * 2) * 30;
      minutes = clamp(minutes, 360, 1380);
      const start = minutesToTime(minutes);
      const end = minutesToTime(minutes + 60);
      openTaskModal(null, {
        scheduledDate: actionElement.dataset.date,
        startTime: start,
        endTime: end
      });
      return;
    }
    if (action === 'open-day') {
      openDayModal(actionElement.dataset.date);
      return;
    }
    if (action === 'view-avatar') {
      openAvatarModal();
      return;
    }
    if (action === 'open-project') {
      openProjectDetail(actionElement.dataset.id);
      return;
    }
    if (action === 'new-project') {
      openProjectModal();
      return;
    }
    if (action === 'edit-project') {
      openProjectModal(actionElement.dataset.id);
      return;
    }
    if (action === 'delete-project') {
      requestDeleteProject(actionElement.dataset.id);
      return;
    }
    if (action === 'delete-tag') {
      requestDeleteTag(actionElement.dataset.id);
      return;
    }
    if (action === 'export-data') {
      exportData();
      return;
    }
    if (action === 'save-backup-as') {
      saveBackupAs();
      return;
    }
    if (action === 'import-data') {
      triggerImport();
      return;
    }
    if (action === 'reset-data') {
      resetData();
      return;
    }
    if (action === 'test-reminder') {
      showReminder('water', true);
      return;
    }
    if (action === 'reminder-action') {
      const kind = actionElement.dataset.kind;
      const date = todayKey();
      const day = ensureDay(date);
      if (kind === 'water') {
        day.water = Math.max(0, Number(day.water) + 1);
        saveNow();
        render();
        showToast('记下一杯水。', { title: '喝水打卡' });
      } else if (kind === 'meal') {
        const meal = actionElement.dataset.meal;
        const mealLabels = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐' };
        if (meal && Object.prototype.hasOwnProperty.call(mealLabels, meal)) {
          day.meals[meal] = true;
          saveNow();
          render();
          showToast(`${mealLabels[meal]}打卡完成。`, { title: '好好吃饭' });
        }
      } else if (kind === 'shower') {
        day.shower = true;
        saveNow();
        render();
        showToast('洗澡打卡完成。', { title: '今日完成' });
      } else if (kind === 'vocab') {
        ui.dayDate = date;
        navigate('today');
        showToast('去背十个单词，也算今天没有空白。', { title: mentorName() + '提醒' });
      }
      actionElement.closest('.reminder-card')?.remove();
      return;
    }
  }

  function handleChange(event) {
    const element = event.target;
    if (element.matches('[data-setting]')) {
      handleSettingField(element);
      return;
    }
    if (element.matches('[data-day-field]')) {
      handleDayField(element);
      return;
    }
    if (element.id === 'taskProject') {
      updateSectionOptions();
      return;
    }
    if (element.id === 'taskProjectFilter') {
      ui.taskProjectFilter = element.value;
      render();
      return;
    }
    if (element.id === 'taskTagFilter') {
      ui.taskTagFilter = element.value;
      render();
      return;
    }
    if (element.id === 'projectTagFilter') {
      ui.projectTagFilter = element.value;
      render();
      return;
    }
    if (element.id === 'importFile') {
      handleImportFile(element.files && element.files[0]);
      return;
    }
  }

  function handleInput(event) {
    const element = event.target;
    if (element.id === 'taskSearch') {
      updateTaskSearch(element);
      return;
    }
    if (element.matches('[data-setting]')) {
      handleSettingField(element);
      return;
    }
    if (element.matches('[data-day-field]')) {
      handleDayField(element);
    }
  }

  function handleSubmit(event) {
    const form = event.target.closest('form[data-form]');
    if (!form) return;
    event.preventDefault();
    const type = form.dataset.form;
    if (type === 'task') handleTaskSubmit(form);
    else if (type === 'quick-task') handleQuickTaskSubmit(form);
    else if (type === 'project') handleProjectSubmit(form);
    else if (type === 'study') handleStudySubmit(form);
    else if (type === 'tag') handleTagSubmit(form);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      if (modalRoot.innerHTML) closeModal();
      else closeSidebar();
      return;
    }
    if (event.key === 'Enter' && !['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(event.target.tagName)) {
      const taskRow = event.target.closest('[data-action="edit-task"]');
      if (taskRow) {
        event.preventDefault();
        taskRow.click();
      }
    }
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('change', handleChange);
  document.addEventListener('input', handleInput);
  document.addEventListener('submit', handleSubmit);
  document.addEventListener('keydown', handleKeydown);

  window.addEventListener('hashchange', () => {
    const next = location.hash.replace(/^#\/?/, '') || 'dashboard';
    const view = ROUTE_META[next] ? next : 'dashboard';
    if (ui.view !== view) {
      ui.view = view;
      closeModal();
      closeSidebar();
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  window.addEventListener('beforeunload', saveNow);

  renderNav();
  const initialHash = location.hash.replace(/^#\/?/, '');
  ui.view = ROUTE_META[initialHash] ? initialHash : 'dashboard';
  render();
  if (storageWasEmpty) saveNow();

  if (storageWasEmpty) {
    setTimeout(() => {
      showToast('工作台已准备好。可以先到设置里给督导起个名字，再写下第一件事。', { title: '欢迎来到栖居', icon: 'leaf', duration: 6500 });
    }, 800);
  }
  if (startupWarning) {
    setTimeout(() => showToast('本地数据读取失败，已使用初始工作台。若之前有备份，可以尝试导入。', { title: '数据提示', icon: 'alert', duration: 6500 }), 900);
  }

  setTimeout(checkReminders, 1600);
  setInterval(checkReminders, 20000);
  setInterval(() => {
    if (todayKey() !== renderedDay) {
      renderedDay = todayKey();
      if (!document.body.classList.contains('modal-open')) {
        ui.dayDate = renderedDay;
        render();
      }
    }
  }, 60000);
})();
