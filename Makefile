PORT ?= 8000

.PHONY: serve clean

# Serve the PWA directory on localhost for development.
serve:
	@echo "Serving PwdHash PWA at http://localhost:$(PORT)"
	@cd pwa && python3 -m http.server $(PORT)

clean:
	rm -rf pwa/__pycache__
