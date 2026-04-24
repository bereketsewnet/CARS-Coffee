const fs = require('fs');
let b = fs.readFileSync('src/components/admin/PartnerCrud.tsx', 'utf8');

b = b.replace('website: string | null;', 'website: string | null;\n  description: string | null;\n  role: string | null;\n  isHorizontal: boolean;');

let fields = `
          <Field label="Description">
            <textarea
              name="description"
              defaultValue={editing?.description ?? ""}
              placeholder="Provides laboratory testing..."
              className={inputCls + " min-h-[80px]"}
            />
          </Field>

          <Field label="Role">
            <select
              name="role"
              defaultValue={editing?.role ?? "other"}
              className={"w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-leaf-bright/40"}
            >
              <option value="university">University</option>
              <option value="research">Research</option>
              <option value="ngo">NGO</option>
              <option value="farmer">Farmer</option>
              <option value="lab">Lab</option>
              <option value="other">Other</option>
            </select>
          </Field>

          <Field label="Is Horizontal Logo?">
             <label className="flex items-center gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                name="isHorizontal"
                value="true"
                defaultChecked={editing?.isHorizontal ?? false}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm text-muted-foreground">Check if the logo is wide/horizontal</span>
            </label>
          </Field>

          <Field label="Website">`;

b = b.replace('<Field label="Website">', fields);
fs.writeFileSync('src/components/admin/PartnerCrud.tsx', b);
