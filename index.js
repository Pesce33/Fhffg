// Revenge Next Addon: Ababa
// Chuyển đổi từ Vencord plugin sang định dạng Revenge Next
// Sử dụng API Patcher của Revenge để vá mã Metro

import { patcher, metro } from "@revenge-mod/api";

export default {
    name: "Ababa",
    description: "Bypass hệ thống xác minh độ tuổi của Discord",
    authors: ["Commandtechno (gốc)", "Chuyển đổi bởi Palofsc"],
    version: "1.0.0",

    onLoad() {
        // Tìm module chứa mã liên quan đến xác minh độ tuổi
        // Sử dụng findByProps để định vị module có thuộc tính nsfwAllowed
        const module = metro.findByProps("nsfwAllowed", "ageVerificationStatus");
        
        if (!module) {
            console.error("[Ababa] Không tìm thấy module xác minh độ tuổi");
            return;
        }

        // Vá thuộc tính nsfwAllowed thành true
        // Thay thế biểu thức kiểm tra null bằng giá trị true
        patcher.instead(module, "nsfwAllowed", () => {
            return true;
        });

        // Vá thuộc tính ageVerificationStatus thành 3 (VERIFIED_ADULT)
        // Giá trị 3 tương ứng với trạng thái đã xác minh người lớn
        patcher.instead(module, "ageVerificationStatus", () => {
            return 3;
        });

        console.log("[Ababa] Đã vá xong hệ thống xác minh độ tuổi");
    },

    onUnload() {
        // Gỡ bỏ tất cả các bản vá đã áp dụng
        // Phương thức unpatchAll sẽ khôi phục mã gốc
        patcher.unpatchAll();
        console.log("[Ababa] Đã gỡ bỏ các bản vá");
    }
};
