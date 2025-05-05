import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const PHONE = 'YOUR_PHONE_NUMBER';
const PASSWORD = 'YOUR_PASSWORD';

const protectedPages = [
  'https://juie.amanbay.info/ru/',
  'https://juie.amanbay.info/ru/products',
  'https://juie.amanbay.info/ru/categories',
  'https://juie.amanbay.info/ru/products/create',
  'https://juie.amanbay.info/ru/categories/create',
  'https://juie.amanbay.info/ru/product-type',
  'https://juie.amanbay.info/ru/product-type/create',
  'https://juie.amanbay.info/ru/warehouse',
  'https://juie.amanbay.info/ru/warehouse/create',
  'https://juie.amanbay.info/ru/warehouse-type',
  'https://juie.amanbay.info/ru/warehouse-type/create',
  'https://juie.amanbay.info/ru/stock-movement',
  'https://juie.amanbay.info/ru/stock-movement/create',
  'https://juie.amanbay.info/ru/incoming',
  'https://juie.amanbay.info/ru/incoming/create',
  'https://juie.amanbay.info/ru/inventory',
  'https://juie.amanbay.info/ru/inventory/create',
  'https://juie.amanbay.info/ru/stock-adjustment',
  'https://juie.amanbay.info/ru/stock-adjustment/create',
  'https://juie.amanbay.info/ru/customers',
  'https://juie.amanbay.info/ru/customers/create',
  'https://juie.amanbay.info/ru/suppliers',
  'https://juie.amanbay.info/ru/suppliers/create',
  'https://juie.amanbay.info/ru/counterparty-types',
  'https://juie.amanbay.info/ru/counterparty-types/create',
  'https://juie.amanbay.info/ru/staff',
  'https://juie.amanbay.info/ru/staff/create',
  'https://juie.amanbay.info/ru/roles',
  'https://juie.amanbay.info/ru/roles/create',
  'https://juie.amanbay.info/ru/permissions',
  'https://juie.amanbay.info/ru/permissions/create',
  'https://juie.amanbay.info/ru/filials',
  'https://juie.amanbay.info/ru/filials/create',
  'https://juie.amanbay.info/ru/accounts',
  'https://juie.amanbay.info/ru/accounts/create',
  'https://juie.amanbay.info/ru/account-types',
  'https://juie.amanbay.info/ru/account-types/create',
  'https://juie.amanbay.info/ru/pos',
  'https://juie.amanbay.info/ru/pos/create',
  'https://juie.amanbay.info/ru/sale-receipts',
  'https://juie.amanbay.info/ru/sale-receipts',
  'https://juie.amanbay.info/ru/posback-transactions',
  'https://juie.amanbay.info/ru/pos-products',
  'https://juie.amanbay.info/ru/settings',
];

const ensureOutputDir = () => {
  const dir = path.resolve('test-results/a11y');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const normalizeUrl = (url: string): string => {
  return url.replace('https://juie.amanbay.info/ru', '').replace(/[\/:"]+/g, '_') || 'root';
};

const saveJsonReport = (name: string, data: any) => {
  const dir = ensureOutputDir();
  const filePath = path.join(dir, `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`📄 JSON сохранён: ${filePath}`);
};

const saveMarkdownSummary = (name: string, violations: any[]) => {
  const dir = ensureOutputDir();
  const filePath = path.join(dir, `${name}-report.md`);

  const summary = violations.map((v, i) => `
### ❌ Проблема ${i + 1}: ${v.id}
- **Описание:** ${v.description}
- **Справка:** ${v.helpUrl}
- **Количество затронутых элементов:** ${v.nodes.length}

${v.nodes.map((n: any, idx: number) => `  - **Элемент ${idx + 1}:** ${n.target.join(', ')}
    - **Ошибка:** ${n.failureSummary}`).join('\n')}
  `).join('\n');

  fs.writeFileSync(filePath, summary);
  console.log(`📝 Markdown отчёт сохранён: ${filePath}`);
};

test('🔍 Полный аудит доступности с анализом ошибок', async ({ page }) => {
  console.log('🔐 Авторизация...');
  await page.goto('https://juie.amanbay.info/ru/login');

  await page.getByPlaceholder('Введите телефонный номер').fill(PHONE);
  await page.getByPlaceholder(/12\+ символов/).fill(PASSWORD);
  await page.getByRole('button', { name: /войти/i }).click();
  await page.waitForLoadState('networkidle');

  const analyzePage = async (url: string) => {
    const name = normalizeUrl(url);
    console.log(`🌐 Анализ: ${url}`);

    await page.goto(url);
    await page.waitForLoadState('networkidle');
    await page.addScriptTag({ content: axeSource });

    try {
      const results = await page.evaluate(async () => {
        return await (window as any).axe.run(document);
      });

      saveJsonReport(name, results);
      saveMarkdownSummary(name, results.violations);

      if (results.violations.length > 0) {
        console.warn(`⚠️ ${results.violations.length} нарушений на ${url}`);
        results.violations.forEach((v, idx) => {
          console.log(`\n${idx + 1}. ${v.id} - ${v.description}`);
          console.log(`  Помощь: ${v.helpUrl}`);
          v.nodes.forEach((node: any, nidx: number) => {
            console.log(`    → [${nidx + 1}] Элемент: ${node.target.join(', ')}`);
            console.log(`       Ошибка: ${node.failureSummary}`);
          });
        });
      } else {
        console.log(`✅ Нарушений не обнаружено на ${url}`);
      }
    } catch (err: any) {
      console.error(`❌ Ошибка при анализе ${url}: ${err.message}`);
    }
  };

  for (const url of protectedPages) {
    await analyzePage(url);
  }

  console.log('🎉 Аудит завершён! Отчёты доступны в: test-results/a11y/');
});
